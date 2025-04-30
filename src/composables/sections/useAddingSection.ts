import { computed, ref } from 'vue'

import { convertAddingToNewSection, type AddingSection, type Section } from '@/types/sections'
import { addSection } from '@/services/perchAI/sections'

export function useAddingSection() {
  const section = ref<AddingSection>({
    perch_mount_id: null,
    swapped_date: null,
    selectedCamera: null,
    selectedMountType: null,
    selectedMembers: [],
    note: null,
    valid: true,
  })
  const valid = ref<boolean>(false)
  const validate = () => {
    valid.value =
      section.value !== null &&
      section.value.perch_mount_id !== null &&
      section.value.swapped_date !== null &&
      section.value.selectedCamera !== null &&
      section.value.selectedMembers !== null &&
      section.value.selectedMountType !== null
  }
  const submitting = ref<boolean>(false)
  const addedSection = ref<Section | null>(null)
  const submitError = ref<Error | null>(null)
  const submit = async () => {
    submitting.value = true
    const newSection = convertAddingToNewSection(section.value)
    console.log(newSection)
    try {
      addedSection.value = await addSection(newSection)
      submitting.value = false
    } catch (err) {
      submitError.value = err as Error
      submitting.value = false
    }
  }

  return { section, valid, validate, submitting, addedSection, submitError, submit }
}
