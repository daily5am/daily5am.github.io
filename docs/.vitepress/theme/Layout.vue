<template>
  <Layout>
    <template #doc-after>
      <Comment v-if="showComments" />
    </template>
  </Layout>
  
</template>

<script setup>
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import Comment from './components/Comment.vue'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const showComments = computed(() => {
  const fm = (page && page.value && page.value.frontmatter) || {}
  if (fm && fm.comments === false) return false
  // 只在文档内容页面显示（有 title/lastUpdated 等）
  return true
})
</script>
