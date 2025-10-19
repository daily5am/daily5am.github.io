<template>
  <div class="video-player" :style="{ aspectRatio: aspectRatio }">
    <!-- YouTube 视频 -->
    <iframe
      v-if="isYouTube"
      :src="youtubeEmbedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    
    <!-- Bilibili 视频 -->
    <iframe
      v-else-if="isBilibili"
      :src="bilibiliEmbedUrl"
      frameborder="0"
      allowfullscreen
    ></iframe>
    
    <!-- 本地视频 -->
    <video
      v-else-if="isLocalVideo"
      :src="src"
      controls
      preload="metadata"
    >
      您的浏览器不支持视频播放。
    </video>
    
    <!-- 其他视频链接 -->
    <div v-else class="video-placeholder">
      <p>视频链接: <a :href="src" target="_blank">{{ src }}</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  aspectRatio?: string
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: '16/9'
})

// 判断是否为 YouTube 视频
const isYouTube = computed(() => {
  return props.src.includes('youtube.com') || props.src.includes('youtu.be')
})

// 判断是否为 Bilibili 视频
const isBilibili = computed(() => {
  return props.src.includes('bilibili.com')
})

// 判断是否为本地视频
const isLocalVideo = computed(() => {
  return props.src.match(/\.(mp4|webm|ogg|avi|mov)$/i)
})

// YouTube 嵌入 URL
const youtubeEmbedUrl = computed(() => {
  let videoId = ''
  
  if (props.src.includes('youtu.be/')) {
    videoId = props.src.split('youtu.be/')[1].split('?')[0]
  } else if (props.src.includes('youtube.com/watch')) {
    const url = new URL(props.src)
    videoId = url.searchParams.get('v') || ''
  }
  
  return `https://www.youtube.com/embed/${videoId}`
})

// Bilibili 嵌入 URL
const bilibiliEmbedUrl = computed(() => {
  // 提取 BV 号
  const bvMatch = props.src.match(/\/video\/(BV\w+)/)
  if (bvMatch) {
    return `https://player.bilibili.com/player.html?bvid=${bvMatch[1]}&page=1`
  }
  
  // 提取 av 号
  const avMatch = props.src.match(/\/video\/av(\d+)/)
  if (avMatch) {
    return `https://player.bilibili.com/player.html?aid=${avMatch[1]}&page=1`
  }
  
  return props.src
})
</script>

<style scoped>
.video-player {
  width: 100%;
  max-width: 100%;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background: #000;
}

.video-player iframe,
.video-player video {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.video-placeholder {
  padding: 2rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.video-placeholder a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.video-placeholder a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video-player {
    margin: 0.5rem 0;
  }
}
</style>