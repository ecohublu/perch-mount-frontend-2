import { updateMediumEvent } from '@/services/perchAI/media'
import { getEvents } from '@/services/perchAI/options'
import type { Medium } from '@/types/media'
import { convertOptionsToSelectedOptions, type SelectedOption } from '@/types/options'
import { ref } from 'vue'

export function useUpdateMediumEvnet(toast: any = null) {
  const eventOptions = ref<SelectedOption[]>([])
  const selectedEvent = ref<SelectedOption | null>(null)
  const isLoading = ref(false)
  const isUpdating = ref(false)
  const error = ref<Error | null>(null)
  const initSelectedEvent = (medium: Medium) => {
    selectedEvent.value = {
      code: medium.reviewed_contents?.event?.id!,
      name: medium.reviewed_contents?.event?.name!,
    }
  }
  const fetchEventOptions = async () => {
    isLoading.value = true
    error.value = null
    try {
      const events = await getEvents()
      eventOptions.value = convertOptionsToSelectedOptions(events)
    } catch (err) {
      error.value = err as Error
      eventOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  const fetchUpdateMediumEvent = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      const eventId = selectedEvent.value ? selectedEvent.value?.code! : null
      await updateMediumEvent(id, eventId)
      if (toast !== null && selectedEvent.value) {
        toast.add(localSuccessToast(`${selectedEvent.value?.name}`))
      } else if (toast !== null) {
        toast.add(localSuccessToast('null'))
      }
    } catch (err) {
      error.value = err as Error
      if (toast !== null) {
        toast.add(localErrorToast(err as string))
      }
    } finally {
      isUpdating.value = false
    }
  }

  return {
    data: eventOptions,
    selectedEvent,
    isLoading,
    isUpdating,
    error,
    initSelectedEvent,
    fetchEventOptions,
    fetchUpdateMediumEvent,
  }
}
function localErrorToast(message: string) {
  return { severity: 'error', summary: 'Update Event Failed', detail: message, life: 10000 }
}
function localSuccessToast(message: string) {
  return { severity: 'success', summary: 'Update Event Successed', detail: message, life: 10000 }
}
