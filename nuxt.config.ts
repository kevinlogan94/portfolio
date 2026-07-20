// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    'nuxt-gtag'
  ],

  // Nuxt Content MDC components: no Content* prefix, available in markdown
  components: [
    {
      path: '~/components/content',
      pathPrefix: false,
      global: true
    },
    {
      path: '~/components',
      ignore: ['content/**']
    }
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/blog/xals-path-1.1.0': { redirect: { to: '/blog/xals-path-1.2.0', statusCode: 301 } }
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID
  }
})
