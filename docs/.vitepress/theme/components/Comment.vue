<template>
  <div class="vp-comment">
    <div id="tcomment"></div>
  </div>
  <div v-if="error" class="vp-comment-error">{{ error }}</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const error = ref('')
let inited = false
let cleanup = null

function getConfig() {
  const cfg = (typeof window !== 'undefined' && window.__TK__) || {}
  const { serverURL, envId, lang = 'zh-CN', region } = cfg
  return { serverURL, envId, lang, region }
}

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = src
    el.async = true
    el.onload = () => resolve()
    el.onerror = () => reject(new Error('failed to load ' + src))
    document.head.appendChild(el)
  })
}

function enforceClientGuards() {
  const root = document.getElementById('tcomment')
  if (!root) return
  // 链接点击白名单：仅 http/https 且带主机；否则转纯文本
  root.addEventListener('click', (e) => {
    const t = e.target
    if (t && t.tagName === 'A') {
      const href = t.getAttribute('href') || ''
      try {
        const u = new URL(href, location.origin)
        if (!/^https?:$/.test(u.protocol)) e.preventDefault()
        t.setAttribute('rel', 'nofollow ugc noopener noreferrer')
      } catch {
        e.preventDefault()
      }
    }
  })
}

onMounted(async () => {
  if (inited) return
  try {
    await loadScript('https://cdn.staticfile.org/twikoo/1.6.31/twikoo.min.js')
    const { serverURL, envId, lang, region } = getConfig()
    if (!serverURL && !envId) {
      error.value = '未配置 Twikoo serverURL/envId'
      return
    }
    // 最小冷却与字数限制交由后端；此处仅渲染
    window.twikoo.init({
      el: '#tcomment',
      lang,
      region,
      serverURL,
      envId
    })
    enforceClientGuards()
    inited = true
  } catch (e) {
    error.value = '评论系统加载失败'
    console.error(e)
  }
})

onBeforeUnmount(() => {
  if (typeof cleanup === 'function') cleanup()
})
</script>

<style scoped>
.vp-comment { margin-top: 32px; }
.vp-comment-error { color: var(--vp-c-danger-2); margin-top: 12px; }
</style>


