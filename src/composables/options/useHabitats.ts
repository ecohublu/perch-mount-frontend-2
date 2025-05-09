import { ref } from 'vue'
import { getHabitats } from '@/services/perchAI/options'
import { type SelectedOption } from '@/types/options'

export function useHabitatOptions() {
  const habitatOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const habitats = await getHabitats()
      habitatOptions.value = habitats.map((habitat) => ({
        code: habitat,
        name: habitat,
      }))
    } catch (err) {
      error.value = err as Error
      habitatOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: habitatOptions,
    isLoading,
    error,
    fetch,
  }
}
