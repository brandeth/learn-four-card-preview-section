// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/styles/main.scss"],
  runtimeConfig: {
    apiSecret: process.env.OPENAI_API_KEY,
  },
});
