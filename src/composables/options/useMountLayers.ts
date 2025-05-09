import { ref } from 'vue'
import { getHabitats, getMountLayers } from '@/services/perchAI/options'
import { type SelectedOption } from '@/types/options'

export function useMountLayerOptions() {
  const mountLayerOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const mountLayers = await getMountLayers()
      mountLayerOptions.value = mountLayers.map((mountLayer) => ({
        code: mountLayer,
        name: mountLayer,
      }))
    } catch (err) {
      error.value = err as Error
      mountLayerOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: mountLayerOptions,
    isLoading,
    error,
    fetch,
  }
}
