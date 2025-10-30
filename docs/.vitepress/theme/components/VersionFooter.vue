<template>
  <div class="version-footer">
    <div class="vf-row">
      <strong>版本声明</strong>
    </div>
    <div class="vf-row">
      <span>本文内容遵循 <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT License</a>，除非另有特别说明。</span>
    </div>
  </div>
  
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const meta = ref({})
const relative = computed(() => (page.value && page.value.relativePath) || '')
const info = computed(() => {
  const base = meta.value[relative.value] || {}
  const fm = page.value?.frontmatter || {}
  return {
    createdAt: fm.created || base.createdAt,
    updatedAt: fm.updated || base.updatedAt
  }
})

function pad(n){ return String(n).padStart(2, '0') }
function formatDate(str){
  if (!str) return ''
  try {
    const d = new Date(str)
    const y = d.getFullYear()
    const m = pad(d.getMonth() + 1)
    const da = pad(d.getDate())
    return `${y}-${m}-${da}`
  } catch { return str }
}

onMounted(async () => {
  try {
    const res = await fetch('/meta.json', { cache: 'no-store' })
    if (res.ok) meta.value = await res.json()
  } catch {}
})
</script>

<style scoped>
.version-footer{ margin-top:24px; padding:12px 14px; border:1px dashed var(--vp-c-divider); border-radius:8px; color: var(--vp-c-text-2); background: var(--vp-c-bg-soft); }
.vf-row{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin:4px 0; font-size:.92rem; line-height:1.6; }
.sep{ color: var(--vp-c-text-3); }
.version-footer a{ color: var(--vp-c-brand-1); text-decoration: none; }
.version-footer a:hover{ text-decoration: underline; }
</style>



