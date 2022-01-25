import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Important from './components/Important.vue'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Important', Important)
  }
}

export default theme
