import { updateMediumFeature } from '@/services/perchAI/media'
import { getBehaviors } from '@/services/perchAI/options'
import type { Medium } from '@/types/media'
import { convertOptionsToSelectedOptions, type SelectedOption } from '@/types/options'
import { ref } from 'vue'
import { useAuth } from '../useAuth'

const auth = useAuth()

export function useUpdateMediumFeature(toast: any = null) {
  const behaviorOptions = ref<SelectedOption[]>([])
  const selectedBehavior = ref<SelectedOption | null>(null)
  const isLoading = ref(false)
  const isUpdating = ref(false)
  const error = ref<Error | null>(null)
  const initSelectedBehavior = (medium: Medium) => {
    selectedBehavior.value = {
      code: medium.reviewed_contents?.behavior?.id!,
      name: medium.reviewed_contents?.behavior?.name!,
    }
  }
  const fetchBehaviorOptions = async () => {
    isLoading.value = true
    error.value = null
    try {
      const events = await getBehaviors()
      behaviorOptions.value = convertOptionsToSelectedOptions(events)
    } catch (err) {
      error.value = err as Error
      behaviorOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  const fetchUpdateMediumFeature = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      const behaviorId = selectedBehavior.value ? selectedBehavior.value?.code! : null
      const featureById = auth.currentUser && behaviorId ? auth.currentUser.id : null
      await updateMediumFeature(id, behaviorId, featureById)
      if (toast !== null && selectedBehavior.value) {
        toast.add(localSuccessToast(`${selectedBehavior.value?.name}`))
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
    data: behaviorOptions,
    selectedBehavior,
    isLoading,
    isUpdating,
    error,
    initSelectedBehavior,
    fetchBehaviorOptions,
    fetchUpdateMediumFeature,
  }
}
function localErrorToast(message: string) {
  return { severity: 'error', summary: 'Update Feature Failed', detail: message, life: 10000 }
}
function localSuccessToast(message: string) {
  return { severity: 'success', summary: 'Update Feature Successed', detail: message, life: 10000 }
}
