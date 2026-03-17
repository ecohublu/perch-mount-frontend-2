import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { useEnv } from '@/composables/useEnv'
import { createApiWithBaseUrl } from '@/composables/useApi'
import type { Member } from '@/types/member'

const env = useEnv()
export const perchAIApi = createApiWithBaseUrl(env.API_BASE_URL)

const mockUser: Member = {
  id: 'dev-user',
  user_name: 'dev-user',
  display_name: 'Development User',
  first_name: 'Development',
  last_name: 'User',
  gmail: null,
  profile_picture_url: '',
  oidc_sub: null,
  position: 'DEVELOPER',
  is_admin: true,
  is_super_admin: true,
  activated: true,
  blocked: false,
}

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()

  async function checkLogin(options?: { redirectOnFail?: boolean }) {
    if (env.DISABLE_AUTH) {
      authStore.setUser(mockUser)
      return true
    }

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
    if (env.DISABLE_AUTH) {
      authStore.setUser(mockUser)
      router.push('/')
      return
    }

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
