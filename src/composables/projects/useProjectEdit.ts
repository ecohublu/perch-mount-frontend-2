import { updateProjectByID } from '@/services/perchAI/projects'
import type { ProjectPatchPayload } from '@/types/project'
import { ref } from 'vue'

export function useProjectEdit(toast: any = null) {
  const error = ref<Error | null>(null)
  const isUpdating = ref<boolean>(false)
  const updateByID = async (id: string, payload: ProjectPatchPayload) => {
    error.value = null
    isUpdating.value = true
    try {
      await updateProjectByID(id, payload)
      if (toast) {
        toast.add({
          severity: 'success',
          summary: 'Update Success',
          detail: payload,
          life: 10000,
        })
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add({
          severity: 'error',
          summary: 'Update Error',
          detail: error.value,
          life: 10000,
        })
      }
    } finally {
      isUpdating.value = false
    }
  }

  return { error, isUpdating, updateByID }
}
