<template>
  <div class="video-player">
    <div class="video-container">
      <iframe
        v-if="isYouTube"
        :src="embedUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="video-iframe"
      ></iframe>
      <video
        v-else-if="isVideoFile"
        :src="src"
        controls
        class="video-element"
      ></video>
      <div v-else class="video-placeholder">
        <p>不支持的视频格式</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
}

const props = defineProps<Props>()

const isYouTube = computed(() => {
  return props.src.includes('youtube.com') || props.src.includes('youtu.be')
})

const isVideoFile = computed(() => {
  return props.src.match(/\.(mp4|webm|ogg|avi|mov)$/i)
})

const embedUrl = computed(() => {
  if (props.src.includes('youtu.be/')) {
    const videoId = props.src.split('youtu.be/')[1].split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  } else if (props.src.includes('youtube.com/watch')) {
    const url = new URL(props.src)
    const videoId = url.searchParams.get('v')
    return `https://www.youtube.com/embed/${videoId}`
  }
  return props.src
})
</script>

<style scoped>
.video-player {
  margin: 24px 0;
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 比例 */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.video-iframe,
.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .video-container {
    margin: 16px 0;
  }
}
</style>