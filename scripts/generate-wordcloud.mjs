#!/usr/bin/env node
import fg from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import segmentitPkg from 'segmentit';
const { useDefault, Segment } = segmentitPkg;

const ROOT = path.resolve(process.cwd());
const DOCS_DIR = path.join(ROOT, 'docs');
const OUT_DIR = path.join(DOCS_DIR, 'public');
const OUT_FILE = path.join(OUT_DIR, 'wordcloud.json');

const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
const segment = useDefault(new Segment());

// Minimal English stopwords; can be extended if needed
const EN_STOPWORDS = new Set([
  'a','an','and','are','as','at','be','by','for','from','has','he','in','is','it','its','of','on','that','the','to','was','were','will','with','this','these','those','or','not','we','you','your','our','they','their','than','then','there','here','into','out','about','over','under','up','down'
]);

// Code/HTML artifacts blacklist (english-like)
const CODE_BLACKLIST = new Set([
  'http','https','www','quot','nbsp','span','class','div','href','style','script','const','var','let','function','return','import','export','await','async','link','text','tag','name','id','value','title','card','highlight','filter','api','json','markdown','md','css','js'
]);

// Domain allow lists
const CN_ALLOW_SUBSTR = [
  // 技术
  '技术','架构','系统','算法','模型','云','容器','微服务','数据库','网络','安全','性能','并发','可用','监控','日志','大数据','计算','工程','优化','测试','运维','研发','平台','工具','开源','芯片','半导体','5g','协议','编程','语言','前端','后端','中间件','服务','存储','缓存','接口','网关','搜索','推荐','调度','编译','分布式','事务','一致性','容错','可靠','高可用','可观测','压测',
  // AI
  '人工智能','机器学习','深度学习','强化学习','计算机视觉','自然语言处理','nlp','cv','ai','llm','大模型',
  // 投资
  '投资','融资','估值','ipo','基金','资本','天使','a轮','b轮','c轮','d轮','pre-ipo','并购','市值','股权','投后',
  // 行业/产业
  '行业','产业','企业','市场','制造','医疗','金融','通信','消费电子','智能硬件','智慧城市','物联网','区块链','新能源','汽车','机器人'
];

const EN_ALLOW_EXACT = new Set([
  'ai','ml','dl','llm','nlp','cv','cloud','microservices','saas','paas','iaas','database','cache','search','gateway','security','devops','observability','monitoring','logging','performance','throughput','latency','reliability','consistency','availability','testing','benchmark',
  'investment','invest','fund','funding','valuation','ipo','mna','capital','angel','seed','seriesa','seriesb','seriesc','market','industry','iot','blockchain','robotics','semiconductor','chip','5g'
]);

// Minimal symbol/number removal
const STRIP_RE = /[\p{P}\p{S}\d]+/gu;

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractText(markdownContent) {
  // remove code fences to avoid noisy tokens
  const withoutCode = markdownContent
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ');
  const rendered = md.render(withoutCode);
  return htmlToText(rendered);
}

function tokenize(text) {
  const lower = text.toLowerCase();
  // Chinese segmentation
  const zhTokens = segment.doSegment(lower, { simple: true });

  // English tokens
  const enSplit = lower.replace(STRIP_RE, ' ').split(/\s+/g);

  const tokens = [];
  for (const t of zhTokens.concat(enSplit)) {
    const token = String(t).trim();
    if (!token) continue;
    // filter trivial tokens
    if (token.length === 1 && /[a-z]/.test(token)) continue;
    if (CODE_BLACKLIST.has(token)) continue;
    if (EN_STOPWORDS.has(token)) continue;
    // skip very common markdown/url artifacts
    if (token.startsWith('http')) continue;
    if (token === 'nbsp') continue;
    // only keep domain tokens
    const hasCJK = /[\p{Script=Han}]/u.test(token);
    let keep = false;
    if (hasCJK) {
      keep = CN_ALLOW_SUBSTR.some((kw) => token.includes(kw));
    } else if (/^[a-z]+$/.test(token)) {
      const normalized = token.replace(/[^a-z]/g, '');
      keep = EN_ALLOW_EXACT.has(normalized);
    }
    if (!keep) continue;
    tokens.push(token);
  }
  return tokens;
}

function countTokens(tokens) {
  const map = new Map();
  for (const t of tokens) {
    map.set(t, (map.get(t) || 0) + 1);
  }
  return map;
}

async function main() {
  const entries = await fg(['docs/**/*.md'], {
    cwd: ROOT,
    dot: false,
    ignore: ['**/node_modules/**', 'docs/.vitepress/**', 'docs/public/**']
  });

  const globalCounts = new Map();

  for (const rel of entries) {
    const file = path.join(ROOT, rel);
    const raw = fs.readFileSync(file, 'utf8');
    const { content, data } = matter(raw);

    const title = typeof data.title === 'string' ? data.title : '';
    const text = [title, extractText(content)].filter(Boolean).join(' ');
    if (!text) continue;

    const tokens = tokenize(text);
    const counts = countTokens(tokens);
    for (const [tok, c] of counts.entries()) {
      globalCounts.set(tok, (globalCounts.get(tok) || 0) + c);
    }
  }

  const items = Array.from(globalCounts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 300);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(items, null, 2), 'utf8');
  console.log(`Wordcloud generated: ${OUT_FILE} (${items.length} tokens)`);
}

main().catch((err) => {
  console.error('Failed to generate wordcloud:', err);
  process.exit(1);
});


