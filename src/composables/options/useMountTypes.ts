import { ref } from 'vue'
import { getMountTypes } from '@/services/perchAI/options'
import type { MountType } from '@/types/options'

export function useMountTypes() {
  const mountTypes = ref<MountType[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      mountTypes.value = await getMountTypes()
    } catch (err) {
      error.value = err as Error
      mountTypes.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: mountTypes,
    isLoading,
    error,
    fetch,
  }
}
