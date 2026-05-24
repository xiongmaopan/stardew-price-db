import fs from 'node:fs/promises';
import path from 'node:path';

const DEBUG_PORT = process.env.CHROME_DEBUG_PORT || '9222';
const SEARCH_URL_PART = 'xiaoheihe.cn/app/search';
const TODAY = process.env.RESEARCH_DATE || '2026-05-24';
const SCROLL_ROUNDS = Number(process.env.XHH_SCROLL_ROUNDS || 20);
const OUTPUT_DIR = path.join(process.cwd(), 'tmp', 'research');
const queries = (process.env.XHH_QUERIES || [
  '星露谷物语',
  '星露谷物语 攻略',
  '星露谷物语 新手',
  '星露谷物语 赚钱',
  '星露谷物语 鱼塘',
  '星露谷物语 酿酒',
  '星露谷物语 温室',
  '星露谷物语 武器',
  '星露谷物语 献祭',
  '星露谷物语 布局',
  '星露谷物语 钓鱼',
].join('|')).split('|').map((query) => query.trim()).filter(Boolean);

const guideKeywords = [
  '攻略',
  '指南',
  '技巧',
  '新手',
  '萌新',
  '赚钱',
  '布局',
  '献祭',
  '钓鱼',
  '鱼塘',
  '酿酒',
  '武器',
  '温室',
  '开荒',
  '地图',
  '图鉴',
  '任务',
  '流派',
  '排名',
  '清单',
  '避坑',
];

const negativeKeywords = [
  '退款',
  '不好玩',
  '无聊',
  '键帽',
  '史低',
  '后悔',
  '求美化',
  '启动',
  '死机',
];

const tagRules = [
  ['beginner', ['新手', '萌新', '开荒', '第一年', '少走', '入门']],
  ['money', ['赚钱', '流派', '酿酒', '鱼塘', '熏鱼', '蟹笼', '养蜂', '养猪', '绵羊']],
  ['checklist', ['清单', '任务', '前8天', '避坑', '不要']],
  ['community-center', ['献祭', '社区中心', '收集包']],
  ['fishing', ['钓鱼', '鱼塘', '鱼图鉴', '蟹笼']],
  ['combat', ['武器', '矿洞', '挖矿', '骷髅洞']],
  ['map-layout', ['地图', '布局', '农场布局', '完美结束']],
  ['greenhouse', ['温室', '姜岛']],
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function oneMonthCutoff(today) {
  const d = new Date(`${today}T00:00:00+08:00`);
  d.setDate(d.getDate() - 30);
  return formatYmd(d);
}

function formatYmd(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function canonicalizeHref(href) {
  try {
    const url = new URL(href);
    return `${url.origin}${url.pathname}`;
  } catch {
    return href;
  }
}

function normalizeDate(line, today) {
  if (!line) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(line)) return line;

  const match = line.match(/^(\d+)/);
  if (!match) return null;

  const n = Number(match[1]);
  const d = new Date(`${today}T20:30:00+08:00`);
  if (line.endsWith('天前')) d.setDate(d.getDate() - n);
  else if (line.endsWith('小时前')) d.setHours(d.getHours() - n);
  else if (line.endsWith('分钟前')) d.setMinutes(d.getMinutes() - n);
  else return null;

  return formatYmd(d);
}

function parseCard(raw, today) {
  const lines = raw.text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const dateLine = [...lines]
    .reverse()
    .find((line) => /^\d{4}-\d{2}-\d{2}$/.test(line) || /^\d+(分钟前|小时前|天前)$/.test(line));
  const date = normalizeDate(dateLine, today);
  const imageCountText = lines.find((line) => /^共?\d+\+?张$/.test(line) || /^10\+张$/.test(line)) || '';
  const numbers = lines.filter((line) => /^\d+$/.test(line)).map(Number);

  let title = '';
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (
      i === 0 ||
      /^Lv\./.test(line) ||
      /^\d+$/.test(line) ||
      line === dateLine ||
      line === imageCountText
    ) {
      continue;
    }
    if (line.length >= 3) {
      title = line;
      break;
    }
  }

  const searchable = `${title} ${lines.join(' ')}`;
  const keywordScore = guideKeywords.reduce((score, keyword) => score + (searchable.includes(keyword) ? 1 : 0), 0);
  const negative = negativeKeywords.some((keyword) => searchable.includes(keyword));
  const tags = tagRules
    .filter(([, keywords]) => keywords.some((keyword) => searchable.includes(keyword)))
    .map(([tag]) => tag);

  const metrics = {
    comments: numbers.at(-2) || 0,
    likes: numbers.at(-1) || 0,
  };

  const valueScore =
    keywordScore * 1000 +
    metrics.likes +
    Math.round(metrics.comments * 0.3) +
    (imageCountText ? 200 : 0) -
    (negative ? 3000 : 0);

  return {
    title,
    href: canonicalizeHref(raw.href),
    sourceQuery: raw.sourceQuery,
    dateLine,
    date,
    imageCountText,
    metrics,
    tags,
    keywordScore,
    valueScore,
    hasImages: raw.imageCount > 0 || Boolean(imageCountText),
  };
}

async function getSearchPage() {
  const tabs = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`)).json();
  const page = tabs.find((tab) => tab.type === 'page' && tab.url.includes(SEARCH_URL_PART));
  if (!page) {
    throw new Error(`No Xiaoheihe search tab found on Chrome debug port ${DEBUG_PORT}.`);
  }
  return page;
}

async function connect(page) {
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  function send(method, params = {}) {
    const messageId = ++id;
    ws.send(JSON.stringify({ id: messageId, method, params }));
    return new Promise((resolve) => pending.set(messageId, resolve));
  }

  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails || result.result?.exceptionDetails) {
      throw new Error(JSON.stringify(result.exceptionDetails || result.result.exceptionDetails));
    }
    return result.result.result.value;
  }

  await send('Runtime.enable');
  await send('Page.enable');
  return { ws, send, evaluate };
}

const extractExpression = `(() => Array.from(document.querySelectorAll('a[href*="/app/bbs/link/"]')).map((a) => ({
  href: a.href,
  text: (a.innerText || a.textContent || '').trim(),
  imageCount: a.querySelectorAll('img').length
})))()`;

async function main() {
  const page = await getSearchPage();
  const { ws, send, evaluate } = await connect(page);
  const seen = new Map();

  for (const query of queries) {
    const url = `https://www.xiaoheihe.cn/app/search?q=${encodeURIComponent(query)}`;
    await send('Page.navigate', { url });
    await wait(3500);

    for (let i = 0; i < SCROLL_ROUNDS; i += 1) {
      const cards = await evaluate(extractExpression);
      for (const card of cards) {
        const key = canonicalizeHref(card.href);
        if (!seen.has(key)) seen.set(key, { ...card, href: key, sourceQuery: query });
      }

      await evaluate('window.scrollBy(0, Math.max(900, window.innerHeight * 2)); true');
      await wait(1200);
    }

    const cards = await evaluate(extractExpression);
    for (const card of cards) {
      const key = canonicalizeHref(card.href);
      if (!seen.has(key)) seen.set(key, { ...card, href: key, sourceQuery: query });
    }
  }
  ws.close();

  const cutoff = oneMonthCutoff(TODAY);
  const parsed = Array.from(seen.values())
    .map((card) => parseCard(card, TODAY))
    .filter((item) => item.title && item.href);

  const recent = parsed.filter((item) => item.date && item.date >= cutoff);
  const valuableRecent = recent
    .filter((item) => item.keywordScore > 0 && item.valueScore > 0)
    .sort((a, b) => b.valueScore - a.valueScore);

  const evergreenHighValue = parsed
    .filter((item) => item.keywordScore > 0 && item.valueScore > 0)
    .sort((a, b) => b.valueScore - a.valueScore)
    .slice(0, 30);

  const output = {
    generatedAt: new Date().toISOString(),
    searchUrl: page.url,
    queries,
    policy:
      'Use these as topic research only. Do not copy source wording or third-party images into StardewPriceDB pages.',
    cutoff,
    capturedCount: parsed.length,
    recentCount: recent.length,
    valuableRecentCount: valuableRecent.length,
    valuableRecent,
    evergreenHighValue,
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const filePath = path.join(OUTPUT_DIR, `xiaoheihe-stardew-topic-leads-${TODAY}.json`);
  await fs.writeFile(filePath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  console.log(`Captured ${parsed.length} Xiaoheihe links.`);
  console.log(`Recent since ${cutoff}: ${recent.length}. Valuable recent: ${valuableRecent.length}.`);
  console.log(`Saved topic research: ${filePath}`);
  console.log('');
  for (const item of valuableRecent.slice(0, 12)) {
    console.log(`- ${item.date} | score ${item.valueScore} | ${item.title}`);
    console.log(`  ${item.href}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
