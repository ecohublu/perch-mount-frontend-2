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

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || '登入失敗')
      }

      // 儲存 JWT
      localStorage.setItem('token', data.token)

      // 更新 Pinia 狀態
      authStore.setUser(data.user)

      // 導向首頁
      router.push('/')
    } catch (err) {
      console.error('Google login failed', err)
    }
  }

  return {
    loginWithGoogle,
  }
}
