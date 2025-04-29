import { computed, ref } from 'vue'

import type { AddingSection } from '@/types/sections'

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
    return (
      section.value &&
      section.value.perch_mount_id &&
      section.value.swapped_date &&
      section.value.selectedCamera &&
      section.value.selectedMembers &&
      section.value.selectedMountType
    )
  }

  return { section, valid, validate }
}
