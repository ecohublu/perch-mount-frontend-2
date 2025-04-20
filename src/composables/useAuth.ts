import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { useEnv } from '@/composables/useEnv'
import { createApiWithBaseUrl } from '@/composables/useApi'
import type { Member } from '@/types/member'

const env = useEnv()
export const perchAIApi = createApiWithBaseUrl(env.API_BASE_URL)

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()

  async function checkLogin(options?: { redirectOnFail?: boolean }) {
    try {
      const res = await perchAIApi.get<Member>('/me', {
        redirectOnUnauthorized: false,
      })

      if (res.blocked || !res.activated) {
        router.push('/auth/denied')
      }

      authStore.setUser(res)
      return true
    } catch (err) {
      authStore.clearUser()

      if (options?.redirectOnFail !== false) {
        router.push('/auth/login')
      }

      return false
    }
  }

  function logout() {
    localStorage.removeItem('token')
    authStore.clearUser()
    router.push('/auth/login')
  }

  return {
    isLoggedIn: authStore.isLoggedIn,
    currentUser: authStore.currentUser,
    checkLogin,
    logout,
  }
}
