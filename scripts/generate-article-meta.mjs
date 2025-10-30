#!/usr/bin/env node
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, 'docs')
const OUT_DIR = path.join(DOCS_DIR, '.vitepress', 'data')
const OUT_FILE = path.join(OUT_DIR, 'meta.json')
const OUT_PUBLIC_DIR = path.join(DOCS_DIR, 'public')
const OUT_PUBLIC_FILE = path.join(OUT_PUBLIC_DIR, 'meta.json')

function sh(cmd) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return ''
  }
}

function getGitDate(fileRel, first = false) {
  const arg = first ? '--diff-filter=A --follow --format=%ad --date=iso-strict' : '--follow --format=%ad --date=iso-strict'
  const cmd = `git log ${arg} -- "${fileRel}"`
  const out = sh(cmd)
  if (!out) return ''
  const lines = out.split('\n').filter(Boolean)
  return first ? lines[lines.length - 1] || lines[0] || '' : lines[0] || ''
}

function stripCode(md) {
  return md.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
}

function getWordStats(content) {
  const text = stripCode(content)
  const chineseMatches = text.match(/[\p{Script=Han}]/gu) || []
  const chineseChars = chineseMatches.length
  const englishWords = (text.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean)).length
  const totalUnits = chineseChars + englishWords
  const readingMinutes = Math.max(1, Math.ceil(totalUnits / 300))
  return { wordCount: totalUnits, readingMinutes }
}

function walk(dir) {
  const res = []
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry)
    const stat = fs.statSync(p)
    if (stat.isDirectory()) {
      if (entry === '.vitepress' || entry === 'public') continue
      res.push(...walk(p))
    } else if (stat.isFile() && entry.endsWith('.md')) {
      res.push(p)
    }
  }
  return res
}

function main() {
  const files = walk(DOCS_DIR)
  const meta = {}
  for (const abs of files) {
    const relFromDocs = path.relative(DOCS_DIR, abs).replace(/\\/g, '/')
    const md = fs.readFileSync(abs, 'utf8')
    const { wordCount, readingMinutes } = getWordStats(md)
    const createdAt = getGitDate(abs, true) || ''
    const updatedAt = getGitDate(abs, false) || ''
    meta[relFromDocs] = { createdAt, updatedAt, wordCount, readingMinutes }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(OUT_FILE, JSON.stringify(meta, null, 2))
  fs.mkdirSync(OUT_PUBLIC_DIR, { recursive: true })
  fs.writeFileSync(OUT_PUBLIC_FILE, JSON.stringify(meta, null, 2))
  console.log(`Article meta generated: ${OUT_FILE} and ${OUT_PUBLIC_FILE} (${Object.keys(meta).length} files)`) 
}

main()


