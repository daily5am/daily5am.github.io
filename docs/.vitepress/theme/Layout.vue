<template>
  <Layout>
    <template #doc-before>
      <MetaBar v-if="showMeta" />
    </template>
    <template #doc-after>
      <VersionFooter />
      <Comment v-if="showComments" />
    </template>
    <template #layout-bottom>
      <QuickActions :showOnMobile="true" />
    </template>
  </Layout>
  
</template>

<script setup>
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import Comment from './components/Comment.vue'
  import MetaBar from './components/MetaBar.vue'
import VersionFooter from './components/VersionFooter.vue'
import QuickActions from './components/QuickActions.vue'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const showComments = computed(() => {
  const fm = (page && page.value && page.value.frontmatter) || {}
  if (fm && fm.comments === false) return false
  // 只在文档内容页面显示（有 title/lastUpdated 等）
  return true
})
const showMeta = computed(() => true)
</script>
