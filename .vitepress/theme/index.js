// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { theme as openapiTheme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import openapiSpec from '../../public/openapi.json'
import './styles/style.css'
import './styles/custom-block.css'
import './styles/font.css'
import ArticleShare from './components/ArticleShare.vue'
import NotFound from './components/NotFound.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    openapiTheme.enhanceApp(ctx)
    useOpenapi({
      app: ctx.app,
      spec: openapiSpec
    })
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'aside-outline-after': () => h(ArticleShare),
      'not-found': () => h(NotFound)
    })
  }
}
