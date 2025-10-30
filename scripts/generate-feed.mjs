#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { Feed } from 'feed'

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, 'docs')
const OUT_DIR = path.join(DOCS_DIR, '.vitepress', 'dist')
const PUBLIC_DIR = path.join(DOCS_DIR, 'public')
const BASE_URL = process.env.SITE_URL || 'https://milliondollardev.example.com'

function toRoute(p) {
  // from absolute md path under docs → /relative.html
  const rel = path.relative(DOCS_DIR, p).replace(/\\/g, '/')
  if (rel.endsWith('index.md')) return '/' + rel.slice(0, -8)
  return '/' + rel.replace(/\.md$/, '.html')
}

function pickTitle(content, fm) {
  if (fm && fm.title) return fm.title
  const m = content.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : '无题'
}

async function main() {
  const feed = new Feed({
    title: '百万研发知识平台',
    description: '从小白到价值百万的研发专家成长指南',
    id: BASE_URL,
    link: BASE_URL,
    language: 'zh-CN',
    favicon: `${BASE_URL}/favicon.ico`,
    image: `${BASE_URL}/logo.svg`,
    copyright: 'Copyright (c) 2024-present, 百万研发知识平台'
  })

  const entries = await fg(['**/*.md', '!**/.vitepress/**', '!**/public/**'], { cwd: DOCS_DIR, dot: false, absolute: true })
  const items = entries.map(abs => {
    const raw = fs.readFileSync(abs, 'utf8')
    const { data: fm, content } = matter(raw)
    const url = toRoute(abs)
    const title = pickTitle(content, fm)
    const date = new Date(fm.updated || fm.date || 0) || new Date()
    return { url, title, fm, content, date }
  }).sort((a, b) => +b.date - +a.date)

  for (const it of items) {
    feed.addItem({
      title: it.title,
      id: `${BASE_URL}${it.url}`,
      link: `${BASE_URL}${it.url}`,
      description: it.fm.description || undefined,
      content: undefined,
      author: it.fm.author ? [{ name: String(it.fm.author) }] : undefined,
      date: it.date
    })
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(path.join(OUT_DIR, 'feed.xml'), feed.rss2(), 'utf-8')
  // also write to public for dev server access
  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), feed.rss2(), 'utf-8')
  console.log(`RSS generated: ${path.join(OUT_DIR, 'feed.xml')} (${items.length} items)`) 
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})


