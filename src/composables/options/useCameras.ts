import { ref } from 'vue'
import { getCameras } from '@/services/perchAI/options'
import type { Camera } from '@/types/options'

export function useCameras() {
  const cameras = ref<Camera[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      cameras.value = await getCameras()
    } catch (err) {
      error.value = err as Error
      cameras.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: cameras,
    isLoading,
    error,
    fetch,
  }
}
