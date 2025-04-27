// composables/useGoogleAuth.ts
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { perchAIApi } from '@/services/perchAI/api'

export function useGoogleAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const loginWithGoogle = async (response: any) => {
    try {
      const idToken = response.credential

      const res = await perchAIApi.post<any>('/login', {
        body: { id_token: idToken },
      })

      localStorage.setItem('token', res.token)

      router.push('/')
    } catch (err) {
      console.error('Google login failed', err)
    }
  }

  return {
    loginWithGoogle,
  }
}
