import { rollbackReviewedMediumStatus } from '@/services/perchAI/media'
import type { Medium } from '@/types/media'
import { ref } from 'vue'

export function useRollbackReviewMedium(toast: any = null) {
  const updatedMedium = ref<Medium | null>(null)
  const isUpdating = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetchRollback = async (id: string) => {
    isUpdating.value = true
    error.value = null
    try {
      updatedMedium.value = await rollbackReviewedMediumStatus(id)
      if (toast !== null) {
        toast.add(localSuccessToast(`${updatedMedium.value.id} rollbacked`))
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
  return { data: updatedMedium, isUpdating, error, fetchRollback }
}

function localErrorToast(message: string) {
  return { severity: 'error', summary: 'Rollback Failed', detail: message, life: 10000 }
}
function localSuccessToast(message: string) {
  return { severity: 'success', summary: 'Rollback Successed', detail: message, life: 10000 }
}
