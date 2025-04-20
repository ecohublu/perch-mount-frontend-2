import { useEnv } from '@/composables/useEnv'
import { createApiWithBaseUrl } from '@/composables/useApi'

const env = useEnv()
export const perchAIApi = createApiWithBaseUrl(env.API_BASE_URL)
