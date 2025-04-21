import { ref } from 'vue'
import { getBehaviors } from '@/services/perchAI/options'
import type { Behavior } from '@/types/options'

export function useBehaviors() {
  const behaviors = ref<Behavior[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      behaviors.value = await getBehaviors()
    } catch (err) {
      error.value = err as Error
      behaviors.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: behaviors,
    isLoading,
    error,
    fetch,
  }
}
