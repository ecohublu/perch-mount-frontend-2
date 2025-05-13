import { ref } from 'vue'
import { getEvents } from '@/services/perchAI/options'
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

export function useAddEvent() {}
