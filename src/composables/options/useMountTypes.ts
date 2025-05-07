import { ref } from 'vue'
import { getMountTypes } from '@/services/perchAI/options'
import {
  convertOptionsToSelectedOptions,
  type MountType,
  type SelectedOption,
} from '@/types/options'
import { convertPerchMountsToSelectedOptions } from '@/types/perchMount'

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

export function useMountTypeOptions() {
  const mountTypeOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const mountTypes = await getMountTypes()
      mountTypeOptions.value = convertOptionsToSelectedOptions(mountTypes)
    } catch (err) {
      error.value = err as Error
      mountTypeOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: mountTypeOptions,
    isLoading,
    error,
    fetch,
  }
}
