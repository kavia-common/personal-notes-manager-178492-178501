export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Personal Notes - Ocean Professional',
      meta: [
        { name: 'description', content: 'Create, edit, and manage your personal notes offline.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2563EB' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect width=%2264%22 height=%2264%22 rx=%2212%22 fill=%22%232563EB%22/><path d=%22M16 20h32v6H16zM16 30h20v6H16zM16 40h28v6H16z%22 fill=%22white%22/></svg>' }
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: ['defineStore'],
  },
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
