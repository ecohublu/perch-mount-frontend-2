import { ref } from 'vue'
import {
  convertAddingToNewPerchMount,
  type AddingPerchMount,
  type PerchMount,
} from '@/types/perchMount'
import { addPerchMount } from '@/services/perchAI/perchMounts'

export function useAddingPerchMount() {
  const perchMount = ref<AddingPerchMount>({
    perch_mount_name: null,
    latitude: null,
    longitude: null,
    selectedHabitat: null,
    selectedMountLayer: null,
    selectedProject: null,
    note: null,
  })
  const valid = ref<boolean>(false)
  const validate = () => {
    valid.value =
      perchMount.value !== null &&
      perchMount.value.perch_mount_name !== null &&
      perchMount.value.latitude !== null &&
      perchMount.value.longitude !== null &&
      perchMount.value.selectedHabitat !== null &&
      perchMount.value.selectedMountLayer !== null
    perchMount.value.selectedProject !== null
  }
  const submitting = ref<boolean>(false)
  const addedPerchMount = ref<PerchMount | null>(null)
  const submitError = ref<Error | null>(null)
  const submitted = ref<boolean>(false)
  const submit = async () => {
    submitting.value = true
    const newPerchMount = convertAddingToNewPerchMount(perchMount.value)
    try {
      addedPerchMount.value = await addPerchMount(newPerchMount)
      submitting.value = false
      submitted.value = true
      submitError.value = null
    } catch (err) {
      submitError.value = err as Error
      submitting.value = false
    }
  }

  return {
    perchMount,
    valid,
    validate,
    submitting,
    submitted,
    addedPerchMount,
    submitError,
    submit,
  }
}
