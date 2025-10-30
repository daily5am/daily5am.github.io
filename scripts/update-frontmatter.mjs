#!/usr/bin/env node
// Update Markdown frontmatter: author/created/updated
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

function sh(cmd) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return ''
  }
}

function getStagedMarkdownFiles() {
  const out = sh('git diff --cached --name-only --diff-filter=ACM')
  return out
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s && s.endsWith('.md') && fs.existsSync(s))
}

function getFirstCommitDate(file) {
  const out = sh(`git log --diff-filter=A --follow --format=%ad --date=iso-strict -- "${file}"`)
  const lines = out.split('\n').filter(Boolean)
  const iso = lines[lines.length - 1] || ''
  return iso ? new Date(iso) : null
}

function formatMMDDYYYY(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${mm}/${dd}/${yyyy}`
}

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return { data: {}, body: src }
  const yaml = m[1]
  const body = src.slice(m[0].length)
  const data = {}
  yaml.split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx > -1) {
      const k = line.slice(0, idx).trim()
      const v = line.slice(idx + 1).trim()
      data[k] = v.replace(/^"|"$/g, '')
    }
  })
  return { data, body }
}

function stringifyFrontmatter(data) {
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${v}`)
  return `---\n${lines.join('\n')}\n---\n`
}

function ensureLayoutDoc(data) {
  if (!data.layout) data.layout = 'doc'
}

function processFile(file) {
  const abs = path.resolve(file)
  const src = fs.readFileSync(abs, 'utf8')
  const { data, body } = parseFrontmatter(src)
  ensureLayoutDoc(data)
  if (!data.author) data.author = 'daily5am'

  const now = new Date()
  const created = data.created
  if (!created) {
    const d = getFirstCommitDate(file) || now
    data.created = formatMMDDYYYY(d)
  }
  data.updated = formatMMDDYYYY(now)

  const out = stringifyFrontmatter(data) + body
  if (out !== src) {
    fs.writeFileSync(abs, out)
    sh(`git add "${file}"`)
    console.log(`Frontmatter updated: ${file}`)
  }
}

function main() {
  const files = getStagedMarkdownFiles()
  files.forEach(processFile)
}

main()


