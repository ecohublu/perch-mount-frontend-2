import { ref } from 'vue'
import { addMountType, getMountTypes } from '@/services/perchAI/options'
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

export function useAddMountType(toast: any = null) {
  const editingData = ref<string | null>(null)
  const isAdding = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetchAdd = async () => {
    isAdding.value = true
    error.value = null
    try {
      await addMountType(editingData.value!)
      if (toast) {
        toast.add(localSuccessToast(editingData.value!))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast(err as string))
      }
      isAdding.value = false
    }
  }

  return { editingData, isAdding, error, fetchAdd }
}

function localErrorToast(message: string) {
  return { severity: 'error', summary: 'Add Mount Type Failed', detail: message, life: 10000 }
}
function localSuccessToast(message: string) {
  return { severity: 'success', summary: 'Add Mount Type Successed', detail: message, life: 10000 }
}
