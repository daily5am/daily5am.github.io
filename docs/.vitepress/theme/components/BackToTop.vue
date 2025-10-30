<template>
  <button
    v-show="isVisible && (!isMobile || props.showOnMobile)"
    :title="label"
    :aria-label="label"
    class="md-back-to-top"
    :style="buttonStyle"
    @click="handleClick"
    @keyup.enter.space.prevent="handleClick"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
  </button>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  threshold: { type: Number, default: 300 },
  size: { type: Number, default: 56 },
  showOnMobile: { type: Boolean, default: false },
  bottom: { type: Number, default: 24 },
  right: { type: Number, default: 24 }
})

const { theme } = useData()

const isVisible = ref(false)
const isMobile = ref(false)

let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    isVisible.value = typeof window !== 'undefined' && window.scrollY > props.threshold
    ticking = false
  })
}

const handleClick = () => {
  if (typeof window === 'undefined') return
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
}

const label = computed(() => {
  const t = theme && theme.value && theme.value.returnToTopLabel
  return t || '返回顶部'
})

const buttonStyle = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px',
  lineHeight: props.size + 'px',
  right: `calc(${props.right}px + env(safe-area-inset-right))`,
  bottom: `calc(${props.bottom}px + env(safe-area-inset-bottom))`
}))

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  const mq = window.matchMedia('(max-width: 640px)')
  const updateMobile = () => { isMobile.value = !!mq.matches }
  updateMobile()
  mq.addEventListener ? mq.addEventListener('change', updateMobile) : mq.addListener(updateMobile)
  // store for cleanup
  ;(window).__md_mq__ = mq
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
  const mq = (window).__md_mq__
  if (mq) {
    mq.removeEventListener ? mq.removeEventListener('change', () => {}) : mq.removeListener(() => {})
    ;(window).__md_mq__ = null
  }
})
</script>

<style scoped>
.md-back-to-top {
  position: fixed;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 9999px;
  color: #fff;
  background: var(--vp-c-brand-1);
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease;
}
.md-back-to-top:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
}
.md-back-to-top:focus-visible {
  outline: 3px solid rgba(59, 130, 246, 0.35);
  outline-offset: 2px;
}
</style>

<style scoped>
/* no-op block to preserve SFC scoped separation if needed */
</style>


