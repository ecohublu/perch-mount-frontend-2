// composables/useEnv.ts
export const useEnv = () => {
  const env = window.__APP_ENV__
  if (!env) throw new Error('Environment not loaded')
  return env
}
