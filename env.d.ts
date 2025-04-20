/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" /> //
// types/env.d.ts
interface AppEnv {
  API_BASE_URL: string
  GOOGLE_CLIENT_ID: string
}

interface Window {
  __APP_ENV__?: AppEnv
}
