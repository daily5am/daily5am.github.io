<template>
  <div ref="rootEl" v-if="info" class="meta-wrapper">
    <div class="meta-row">
      <span class="meta-item">作者：{{ author }}</span>
      <span class="meta-item">创建：{{ formatMDY(info.createdAt) }}</span>
      <span class="meta-item">更新：{{ formatMDY(info.updatedAt) }}</span>
    </div>
    <div class="meta-row">
      <span class="meta-item">字数：{{ info.wordCount }}</span>
      <span class="meta-item">预计阅读：{{ info.readingMinutes }} 分钟</span>
      <span class="meta-item">访问量：<span id="busuanzi_value_page_pv">--</span></span>
    </div>
  </div>
  
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const meta = ref({})
const rootEl = ref(null)
const relative = computed(() => (page.value && page.value.relativePath) || '')
const info = computed(() => {
  const base = meta.value[relative.value] || {}
  const fm = page.value?.frontmatter || {}
  return {
    wordCount: base.wordCount,
    readingMinutes: base.readingMinutes,
    createdAt: fm.created || base.createdAt,
    updatedAt: fm.updated || base.updatedAt
  }
})
const author = computed(() => (page.value?.frontmatter?.author) || 'daily5am')

function pad(n){ return String(n).padStart(2, '0') }
function formatMDY(str) {
  if (!str) return '-'
  try {
    const d = new Date(str)
    const mm = pad(d.getMonth() + 1)
    const dd = pad(d.getDate())
    const yy = d.getFullYear()
    return `${mm}/${dd}/${yy}`
  } catch { return str }
}

function placeUnderTitle() {
  try {
    if (!rootEl.value) return false
    // Try multiple known containers across VitePress versions
    const h1 = document.querySelector('.VPDoc .content h1, .vp-doc .content h1, main .content h1, .content h1, h1')
    if (h1 && h1.parentNode) {
      h1.parentNode.insertBefore(rootEl.value, h1.nextSibling)
      return true
    }
  } catch {}
  return false
}

let mo

async function ensurePlacement() {
  if (placeUnderTitle()) return
  const target = document.querySelector('.VPDoc .content, .vp-doc .content, main .content, .content')
  if (!target) return
  if (mo) mo.disconnect()
  mo = new MutationObserver(() => {
    if (placeUnderTitle()) {
      mo.disconnect()
    }
  })
  mo.observe(target, { childList: true, subtree: true })
}

onMounted(async () => {
  try {
    const res = await fetch('/meta.json', { cache: 'no-store' })
    if (res.ok) meta.value = await res.json()
  } catch {}
  await ensurePlacement()
})

watch(relative, async () => {
  await ensurePlacement()
})
</script>

<style scoped>
.meta-wrapper{ margin:6px 0 18px; }
.meta-row{ display:flex; flex-wrap:wrap; gap:12px; font-size:.92rem; line-height:1.6; color: var(--vp-c-text-3); }
.meta-item{ position:relative; padding-left:0; }
.meta-row .meta-item + .meta-item::before{ content:'·'; margin:0 6px 0 2px; color: var(--vp-c-text-3); }
</style>


