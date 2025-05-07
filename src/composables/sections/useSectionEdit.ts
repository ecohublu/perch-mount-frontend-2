import { shiftSectionTime, updateSectionByID } from '@/services/perchAI/sections'
import type { EditingSection, Section, SectionPatchPayload } from '@/types/sections'
import { ref } from 'vue'

export function useSectionEdit() {
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
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }
  const fetchShiftTime = async (id: string, startTime: string) => {
    error.value = null
    isUpdating.value = true
    try {
      await shiftSectionTime(id, startTime)
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }
  return { error, isUpdating, editingSection, init, fetchShiftTime, updateByID }
}
