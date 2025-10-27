<template>
  <Layout>
    <template #nav-bar-title-before>
      <CustomNavbar />
    </template>
  </Layout>
</template>

<script setup>
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import CustomNavbar from '../components/CustomNavbar.vue'
</script>
