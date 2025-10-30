<template>
  <div class="md-quick-actions" role="region" aria-label="Quick actions">
    <slot>
      <BackToTop :threshold="threshold" :size="size" :showOnMobile="showOnMobile" />
    </slot>
  </div>
  
</template>

<script setup>
import BackToTop from './BackToTop.vue'

defineProps({
  threshold: { type: Number, default: 300 },
  size: { type: Number, default: 56 },
  showOnMobile: { type: Boolean, default: false }
})
</script>

<style scoped>
.md-quick-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  padding-right: calc(16px + env(safe-area-inset-right));
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  z-index: 40;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}
.md-quick-actions :deep(button) {
  pointer-events: auto;
}
</style>


