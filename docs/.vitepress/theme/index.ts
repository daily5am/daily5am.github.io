import DefaultTheme from 'vitepress/theme'
import VideoPlayer from './components/VideoPlayer.vue'
import AssociationGrid from './components/AssociationGrid.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VideoPlayer', VideoPlayer)
    app.component('AssociationGrid', AssociationGrid)
  }
}