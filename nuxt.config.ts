// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME || "Nuxt App",
      apiBaseUrl: process.env.SERVER_BASE_URL || "http://localhost:8000",
    },
  },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
  },

  ssr: false,

  colorMode: {
    classSuffix: "",
  },

  icon: {
    customCollections: [{
      prefix: "custom",
      dir: "./assets/icons",
    }],
  },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv",
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true,
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner"
    }],
  },

  build: {
    transpile: ["vue-sonner"]
  }
});