<template>
  <div ref="container" class="wordcloud-container" />
  <div v-if="error" class="wordcloud-error">{{ error }}</div>
  <div v-else-if="loading" class="wordcloud-loading">加载中...</div>
  <div v-else-if="!data.length" class="wordcloud-empty">暂无数据</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const container = ref(null)
const chart = ref(null)
const data = ref([])
const loading = ref(true)
const error = ref('')

async function loadData() {
  try {
    const resp = await fetch('/wordcloud.json', { cache: 'no-store' })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    data.value = await resp.json()
  } catch (e) {
    error.value = '无法加载词云数据'
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function initChart() {
  // Dynamic import; side-effect import registers the wordcloud series type
  const echarts = await import('echarts')
  await import('echarts-wordcloud')
  chart.value = echarts.init(container.value)
  const option = {
    tooltip: {},
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        gridSize: 8,
        sizeRange: [12, 48],
        rotationRange: [0, 0],
        textStyle: {
          color: () => {
            const colors = ['#4F46E5', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444']
            return colors[Math.floor(Math.random() * colors.length)]
          }
        },
        data: data.value
      }
    ]
  }
  chart.value.setOption(option)
}

function resize() {
  chart.value && chart.value.resize()
}

onMounted(async () => {
  await loadData()
  if (data.value.length && container.value) {
    await initChart()
    window.addEventListener('resize', resize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})
</script>

<style scoped>
.wordcloud-container {
  width: 100%;
  height: 540px;
}
.wordcloud-loading,
.wordcloud-empty,
.wordcloud-error {
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>


