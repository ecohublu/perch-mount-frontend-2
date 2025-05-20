import { ref } from 'vue'
import { getPerchMounts } from '@/services/perchAI/perchMounts'
import { convertPerchMountsToSelectedOptions, type PerchMount } from '@/types/perchMount'
import type { SelectedOption } from '@/types/options'

export function usePerchMounts() {
  const perchMounts = ref<Array<PerchMount>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      perchMounts.value = await getPerchMounts()
    } catch (err) {
      error.value = err as Error
      perchMounts.value = []
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: perchMounts,
    isLoading,
    error,
    fetch,
  }
}
export function usePerchMountOptions() {
  const perchMountOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const perchMoubnts = await getPerchMounts()
      perchMountOptions.value = convertPerchMountsToSelectedOptions(perchMoubnts)
    } catch (err) {
      error.value = err as Error
      perchMountOptions.value = []
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: perchMountOptions,
    isLoading,
    error,
    fetch,
  }
}
