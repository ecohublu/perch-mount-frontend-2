import {
  shiftSectionTime,
  updateSectionByID,
  updateSectionSwappers,
} from '@/services/perchAI/sections'
import type { EditingSection, Section, SectionPatchPayload } from '@/types/sections'
import { formatObjectToString } from '@/utils/pretty'
import { ref } from 'vue'

export function useSectionEdit(toast: any = null) {
  const error = ref<Error | null>(null)
  const isUpdating = ref<boolean>(false)
  const editingSection = ref<EditingSection>({
    swappedDate: null,
    startTime: null,
    endTime: null,
    selectedMountType: null,
    selectedCamera: null,
    selectedSwappers: [],
    note: null,
  })
  const init = (section: Section) => {
    editingSection.value.swappedDate = new Date(section.swapped_date)
    editingSection.value.startTime = new Date(section.start_time)
    editingSection.value.endTime = new Date(section.end_time)
    editingSection.value.selectedMountType = {
      code: section.mount_type_id,
      name: section.mount_type.name,
    }
    editingSection.value.selectedCamera = {
      code: section.camera.id,
      name: section.camera.model_name,
    }
    editingSection.value.note = section.note
    editingSection.value.selectedSwappers = section.swappers.map((swapper) => ({
      code: swapper.id,
      name: swapper.display_name!,
    }))
  }
  const updateByID = async (id: string, payload: SectionPatchPayload) => {
    error.value = null
    isUpdating.value = true
    try {
      await updateSectionByID(id, payload)
      const message: string = formatObjectToString(payload)
      toast.add(localSuccessToast(message))
    } catch (err) {
      error.value = err as Error
      toast.add(localErrorToast(err as string))
    } finally {
      isUpdating.value = false
    }
  }
  const fetchShiftTime = async (id: string) => {
    error.value = null
    isUpdating.value = true
    const startTime = editingSection.value.startTime?.toISOString()!
    try {
      await shiftSectionTime(id, startTime)
      toast.add(localSuccessToast(`start_time: ${startTime}`))
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }
  const fetchUpdateSwappers = async (id: string) => {
    error.value = null
    isUpdating.value = true
    const swapperIds = editingSection.value.selectedSwappers.map(
      (selectedSwapper) => selectedSwapper.code,
    )
    try {
      await updateSectionSwappers(id, swapperIds)
      toast.add(localSuccessToast(`swapper_ids: ${swapperIds}`))
    } catch (err) {
      error.value = err as Error
      toast.add(localErrorToast(err as string))
    } finally {
      isUpdating.value = false
    }
  }
  return {
    error,
    isUpdating,
    editingSection,
    init,
    fetchShiftTime,
    fetchUpdateSwappers,
    updateByID,
  }
}

export function localErrorToast(message: string) {
  return { severity: 'error', summary: 'Update Section Failed', detail: message, life: 10000 }
}
export function localSuccessToast(message: string) {
  return { severity: 'success', summary: 'Update Section Successed', detail: message, life: 10000 }
}
