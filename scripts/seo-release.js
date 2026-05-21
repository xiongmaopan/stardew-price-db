const fs = require('fs');
const path = require('path');

const queuePath = path.join(__dirname, '..', 'data', 'seo-release-queue.json');
const logPath = path.join(__dirname, '..', 'data', 'seo-release-log.json');

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function isoDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return isoDate(date);
}

function loadQueue() {
  const queue = readJson(queuePath);
  if (!queue || !Array.isArray(queue.pages)) {
    throw new Error(`Invalid release queue: ${queuePath}`);
  }
  return queue;
}

function saveQueue(queue) {
  queue.pages.sort((a, b) => a.plannedOrder - b.plannedOrder);
  writeJson(queuePath, queue);
}

function appendLog(entry) {
  const log = readJson(logPath, { releases: [] });
  log.releases.push(entry);
  writeJson(logPath, log);
}

function getReadyPages(queue) {
  return queue.pages
    .filter((page) => page.status === 'ready')
    .sort((a, b) => a.plannedOrder - b.plannedOrder);
}

function printStatus(queue) {
  const counts = queue.pages.reduce((acc, page) => {
    acc[page.status] = (acc[page.status] || 0) + 1;
    return acc;
  }, {});

  console.log('SEO release queue');
  console.log(`Next run date: ${queue.nextRunDate}`);
  console.log(`Cadence: ${queue.cadenceDays} days`);
  console.log(`Max pages per run: ${queue.maxPagesPerRun}`);
  console.log(`Draft: ${counts.draft || 0}`);
  console.log(`Ready: ${counts.ready || 0}`);
  console.log(`Released: ${counts.released || 0}`);
  console.log('');
  console.log('Next candidates:');
  queue.pages
    .filter((page) => page.status !== 'released')
    .sort((a, b) => a.plannedOrder - b.plannedOrder)
    .slice(0, 8)
    .forEach((page) => {
      console.log(`- [${page.status}] ${page.url} -> ${page.targetKeyword}`);
    });
}

function markReady(queue, slug) {
  const page = queue.pages.find((item) => item.slug === slug);
  if (!page) throw new Error(`Unknown page slug: ${slug}`);
  if (page.status === 'released') throw new Error(`${slug} is already released`);
  page.status = 'ready';
  saveQueue(queue);
  console.log(`Marked ready: ${page.url}`);
}

function publish(queue, options = {}) {
  const today = options.date || isoDate();
  const force = Boolean(options.force);

  if (!force && queue.nextRunDate && today < queue.nextRunDate) {
    console.log(`No release due. Today: ${today}, next run: ${queue.nextRunDate}`);
    return [];
  }

  const readyPages = getReadyPages(queue);
  const toRelease = readyPages.slice(0, queue.maxPagesPerRun || 1);

  if (toRelease.length === 0) {
    console.log('No ready pages to release.');
    return [];
  }

  toRelease.forEach((page) => {
    page.status = 'released';
    page.releasedAt = today;
    page.lastModified = today;
  });

  queue.nextRunDate = addDays(today, queue.cadenceDays || 7);
  saveQueue(queue);

  appendLog({
    date: today,
    released: toRelease.map((page) => ({
      slug: page.slug,
      url: page.url,
      targetKeyword: page.targetKeyword,
    })),
    nextRunDate: queue.nextRunDate,
  });

  console.log(`Released ${toRelease.length} page(s):`);
  toRelease.forEach((page) => console.log(`- ${page.url} (${page.targetKeyword})`));
  console.log(`Next run date: ${queue.nextRunDate}`);
  return toRelease;
}

function usage() {
  console.log(`Usage:
  node scripts/seo-release.js status
  node scripts/seo-release.js mark-ready <slug>
  node scripts/seo-release.js publish-due [YYYY-MM-DD]
  node scripts/seo-release.js publish-next [YYYY-MM-DD]

Rules:
  - draft pages never auto-release
  - ready pages release at most one per run by default
  - released pages are logged in data/seo-release-log.json`);
}

try {
  const command = process.argv[2] || 'status';
  const queue = loadQueue();

  if (command === 'status') {
    printStatus(queue);
  } else if (command === 'mark-ready') {
    markReady(queue, process.argv[3]);
  } else if (command === 'publish-due') {
    publish(queue, { date: process.argv[3] });
  } else if (command === 'publish-next') {
    publish(queue, { date: process.argv[3], force: true });
  } else {
    usage();
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
