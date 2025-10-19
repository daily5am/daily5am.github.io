import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import VideoPlayer from './components/VideoPlayer.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('VideoPlayer', VideoPlayer)
  }
}
