import fs from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const siteUrl = process.env.SITE_URL || 'https://milliondollardev.example.com'
const siteTitle = '百万研发知识平台'
const siteDescription = '从小白到价值百万的研发专家成长指南'

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: siteTitle,
    description: siteDescription,
    id: siteUrl,
    link: siteUrl,
    language: 'zh-CN',
    favicon: `${siteUrl}/favicon.ico`,
    image: `${siteUrl}/logo.svg`,
    copyright: 'Copyright (c) 2024-present, 百万研发知识平台',
  })

  const posts = await createContentLoader('**/*.md', {
    excerpt: true,
    render: true
  }).load()

  posts
    .filter(p => p.url && p.html)
    .sort((a, b) => +new Date(b.frontmatter?.date || b.lastUpdated || 0) - +new Date(a.frontmatter?.date || a.lastUpdated || 0))
    .forEach(({ url, frontmatter, html }) => {
      const titleFromH1 = html?.match(/<h1 id=(.*)>(.*?)<a .*?>/)?.[2]
      const itemTitle = frontmatter?.title || titleFromH1 || '无题'
      const isoDate = frontmatter?.updated || frontmatter?.date || new Date()
      feed.addItem({
        title: itemTitle,
        id: `${siteUrl}${url?.slice(1)}`,
        link: `${siteUrl}${url?.slice(1)}`,
        description: frontmatter?.description || undefined,
        content: html,
        author: frontmatter?.author ? [{ name: frontmatter.author as string }] : undefined,
        date: new Date(isoDate as string)
      })
    })

  fs.writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2(), 'utf-8')
}


