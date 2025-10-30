import DefaultTheme from 'vitepress/theme'
import VideoPlayer from './components/VideoPlayer.vue'
import AssociationGrid from './components/AssociationGrid.vue'
import FilterSection from './components/FilterSection.vue'
import WordCloud from './components/WordCloud.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('VideoPlayer', VideoPlayer)
    app.component('AssociationGrid', AssociationGrid)
    app.component('FilterSection', FilterSection)
    app.component('WordCloud', WordCloud)
    // Comment 组件由 Layout 直接引入，无需全局注册

    // Ensure SPA navigations are tracked by Plausible
    if (router) {
      router.onAfterRouteChanged = () => {
        if (typeof window !== 'undefined' && (window).plausible) {
          (window).plausible('pageview')
        }
      }
    }
  }
}