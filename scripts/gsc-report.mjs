import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const SITE = process.env.GSC_SITE || 'sc-domain:stardewpricedb.com';
const QUOTA_PROJECT = process.env.GSC_QUOTA_PROJECT || getCommandOutput('gcloud config get-value project') || 'myitem-466314';
const OUT_DIR = path.join(process.cwd(), 'tmp', 'gsc');

function getCommandOutput(command) {
  try {
    const output = process.platform === 'win32'
      ? execFileSync('powershell.exe', ['-NoProfile', '-Command', command], { encoding: 'utf8' })
      : execFileSync('sh', ['-lc', command], { encoding: 'utf8' });
    return output.trim();
  } catch {
    return '';
  }
}

function getToken() {
  const token = getCommandOutput('gcloud auth application-default print-access-token');
  if (!token) {
    throw new Error('No Google ADC token found. Run gcloud auth application-default login with Search Console read-only scope first.');
  }
  return token;
}

function parseArgs() {
  const args = new Map();
  for (const arg of process.argv.slice(2)) {
    const [key, value] = arg.replace(/^--/, '').split('=');
    if (key && value) args.set(key, value);
  }
  const now = new Date();
  const end = args.get('end') || new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString().slice(0, 10);
  const startDate = new Date(`${end}T00:00:00Z`);
  startDate.setUTCDate(startDate.getUTCDate() - 89);
  const start = args.get('start') || startDate.toISOString().slice(0, 10);
  return { start, end };
}

async function queryGsc({ token, start, end, dimensions, rowLimit }) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Goog-User-Project': QUOTA_PROJECT,
    },
    body: JSON.stringify({
      startDate: start,
      endDate: end,
      dimensions,
      rowLimit,
      dataState: 'all',
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`GSC API failed ${response.status}: ${text}`);
  }
  return JSON.parse(text);
}

function pct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function table(columns, rows) {
  const header = `| ${columns.join(' | ')} |`;
  const divider = `| ${columns.map(() => '---').join(' | ')} |`;
  const body = rows
    .map((row) => `| ${columns.map((column) => String(row[column] ?? '').replace(/\|/g, '\\|')).join(' | ')} |`)
    .join('\n');
  return `${header}\n${divider}\n${body}`;
}

function summarize({ start, end, queries, pages, pageQueries, dates }) {
  const queryRows = (queries.rows || []).map((row) => ({
    query: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));
  const pageRows = (pages.rows || []).map((row) => ({
    page: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));
  const pageQueryRows = (pageQueries.rows || []).map((row) => ({
    page: row.keys[0],
    query: row.keys[1],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));

  const dateRows = dates.rows || [];
  const totalClicks = dateRows.reduce((sum, row) => sum + row.clicks, 0);
  const totalImpressions = dateRows.reduce((sum, row) => sum + row.impressions, 0);
  const avgCtr = totalClicks / Math.max(totalImpressions, 1);
  const avgPosition = dateRows.reduce((sum, row) => sum + row.position * row.impressions, 0) / Math.max(totalImpressions, 1);

  const topQueries = queryRows.slice(0, 20).map((row) => ({
    Query: row.query,
    Clicks: row.clicks,
    Impressions: row.impressions,
    CTR: pct(row.ctr),
    Position: row.position.toFixed(2),
  }));

  const topPages = pageRows.slice(0, 20).map((row) => ({
    Page: row.page.replace('https://stardewpricedb.com', ''),
    Clicks: row.clicks,
    Impressions: row.impressions,
    CTR: pct(row.ctr),
    Position: row.position.toFixed(2),
  }));

  const ctrOpportunities = pageRows
    .filter((row) => row.impressions >= 1000 && row.position <= 12 && row.ctr < 0.01)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25)
    .map((row) => ({
      Page: row.page.replace('https://stardewpricedb.com', ''),
      Clicks: row.clicks,
      Impressions: row.impressions,
      CTR: pct(row.ctr),
      Position: row.position.toFixed(2),
      Action: 'Rewrite title/meta or tighten intent match',
    }));

  const strikingDistance = queryRows
    .filter((row) => row.impressions >= 80 && row.position >= 4 && row.position <= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40)
    .map((row) => ({
      Query: row.query,
      Clicks: row.clicks,
      Impressions: row.impressions,
      CTR: pct(row.ctr),
      Position: row.position.toFixed(2),
    }));

  const pageClusters = new Map();
  for (const row of pageQueryRows) {
    if (row.impressions < 20) continue;
    const page = row.page.replace('https://stardewpricedb.com', '');
    if (!pageClusters.has(page)) pageClusters.set(page, []);
    pageClusters.get(page).push(row);
  }

  const pageIntent = [...pageClusters.entries()]
    .map(([page, rows]) => {
      rows.sort((a, b) => b.impressions - a.impressions);
      return {
        Page: page,
        Clicks: rows.reduce((sum, row) => sum + row.clicks, 0),
        Impressions: rows.reduce((sum, row) => sum + row.impressions, 0),
        'Top queries (impr/pos)': rows.slice(0, 5).map((row) => `${row.query} (${row.impressions}/${row.position.toFixed(1)})`).join('; '),
      };
    })
    .sort((a, b) => b.Impressions - a.Impressions)
    .slice(0, 30);

  return [
    '# GSC SEO Report - StardewPriceDB',
    '',
    `Range: ${start} to ${end}`,
    '',
    `Totals: ${totalClicks.toFixed(0)} clicks, ${totalImpressions.toFixed(0)} impressions, ${pct(avgCtr)} CTR, weighted avg position ${avgPosition.toFixed(2)}.`,
    '',
    '## Top Queries',
    '',
    table(['Query', 'Clicks', 'Impressions', 'CTR', 'Position'], topQueries),
    '',
    '## Top Pages',
    '',
    table(['Page', 'Clicks', 'Impressions', 'CTR', 'Position'], topPages),
    '',
    '## CTR Opportunities',
    '',
    table(['Page', 'Clicks', 'Impressions', 'CTR', 'Position', 'Action'], ctrOpportunities),
    '',
    '## Striking Distance Queries',
    '',
    table(['Query', 'Clicks', 'Impressions', 'CTR', 'Position'], strikingDistance),
    '',
    '## Page Intent Map',
    '',
    table(['Page', 'Clicks', 'Impressions', 'Top queries (impr/pos)'], pageIntent),
    '',
  ].join('\n');
}

const { start, end } = parseArgs();
const token = getToken();
fs.mkdirSync(OUT_DIR, { recursive: true });

const reports = {
  queries: await queryGsc({ token, start, end, dimensions: ['query'], rowLimit: 5000 }),
  pages: await queryGsc({ token, start, end, dimensions: ['page'], rowLimit: 1000 }),
  pageQueries: await queryGsc({ token, start, end, dimensions: ['page', 'query'], rowLimit: 10000 }),
  dates: await queryGsc({ token, start, end, dimensions: ['date'], rowLimit: 1000 }),
};

for (const [name, data] of Object.entries(reports)) {
  fs.writeFileSync(path.join(OUT_DIR, `${name}-${start}_${end}.json`), JSON.stringify(data, null, 2), 'utf8');
}

const summary = summarize({ start, end, ...reports });
const summaryPath = path.join(OUT_DIR, `summary-${start}_${end}.md`);
fs.writeFileSync(summaryPath, summary, 'utf8');

console.log(summary);
console.log(`\nSaved report: ${summaryPath}`);
