import { updateSectionByID } from '@/services/perchAI/sections'
import type { SectionPatchPayload } from '@/types/sections'
import { ref } from 'vue'

export function useSectionEdit() {
  const error = ref<Error | null>(null)
  const isUpdating = ref<boolean>(false)
  const updateByID = async (id: string, payload: SectionPatchPayload) => {
    error.value = null
    isUpdating.value = true
    try {
      await updateSectionByID(id, payload)
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }

  return { error, isUpdating, updateByID }
}
