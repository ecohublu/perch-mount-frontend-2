import { ref } from 'vue'
import { addEvent, getEvents } from '@/services/perchAI/options'
import { convertOptionsToSelectedOptions, type Event, type SelectedOption } from '@/types/options'

export function useEvents() {
  const events = ref<Event[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      events.value = await getEvents()
    } catch (err) {
      error.value = err as Error
      events.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: events,
    isLoading,
    error,
    fetch,
  }
}

export function useEventOptions() {
  const eventsOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const events = await getEvents()
      eventsOptions.value = convertOptionsToSelectedOptions(events)
    } catch (err) {
      error.value = err as Error
      eventsOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: eventsOptions,
    isLoading,
    error,
    fetch,
  }
}

export function useAddEvent(toast: any = null) {
  const editingData = ref<string | null>(null)
  const isAdding = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetchAdd = async () => {
    isAdding.value = true
    error.value = null
    try {
      await addEvent(editingData.value!)
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
  return { severity: 'error', summary: 'Add Event Failed', detail: message, life: 10000 }
}
function localSuccessToast(message: string) {
  return { severity: 'success', summary: 'Add Event Successed', detail: message, life: 10000 }
}
