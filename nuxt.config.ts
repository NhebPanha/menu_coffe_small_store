// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: '/menu_coffe_small_store/',
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/menu_coffe_small_store/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/menu_coffe_small_store/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/menu_coffe_small_store/favicon.svg' }
      ]
    }
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/sitemap.xml', '/robots.txt']
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  }
})
