import { ref } from 'vue'
import { addBehavior, getBehaviors } from '@/services/perchAI/options'
import {
  convertOptionsToSelectedOptions,
  type Behavior,
  type SelectedOption,
} from '@/types/options'

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

export function useBehaviorOptions() {
  const behaviorsOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const behaviors = await getBehaviors()
      behaviorsOptions.value = convertOptionsToSelectedOptions(behaviors)
    } catch (err) {
      error.value = err as Error
      behaviorsOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: behaviorsOptions,
    isLoading,
    error,
    fetch,
  }
}

export function useAddBehavior(toast: any = null) {
  const editingData = ref<string | null>(null)
  const isAdding = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetchAdd = async () => {
    isAdding.value = true
    error.value = null
    try {
      await addBehavior(editingData.value!)
      if (toast) {
        toast.add(localSuccessToast(editingData.value!))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast(err as string))
      }
    } finally {
      isAdding.value = false
    }
  }

  return { editingData, isAdding, error, fetchAdd }
}

function localErrorToast(message: string) {
  return { severity: 'error', summary: 'Add Behavior Failed', detail: message, life: 10000 }
}
function localSuccessToast(message: string) {
  return { severity: 'success', summary: 'Add Behavior Successed', detail: message, life: 10000 }
}
