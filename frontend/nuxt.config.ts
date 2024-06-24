// https://nuxt.com/docs/api/configuration/nuxt-config
/** @type {import('vite').UserConfig} */
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
    },
  },
  ssr: false,
  modules: ["vuetify-nuxt-module", "@nuxt/eslint"],
  devServer: {
    port: 5173,
  },
  runtimeConfig: {
    public: {
        apiUrl: process.env.NUXT_API_URL || "http://localhost:2000",
    },
  },
});
