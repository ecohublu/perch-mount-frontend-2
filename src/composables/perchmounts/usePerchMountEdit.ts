import { updatePerchMountByID } from '@/services/perchAI/perchMounts'

import type { EditingPerchMount, PerchMount, PerchMountPatchPayload } from '@/types/perchMount'

import { ref } from 'vue'

export function usePerchMountEdit(toast: any = null) {
  const error = ref<Error | null>(null)
  const isUpdating = ref<boolean>(false)
  const editingPerchMount = ref<EditingPerchMount>({
    perch_mount_name: null,
    latitude: null,
    longitude: null,
    selectedClaimer: null,
    selectedHabitat: null,
    selectedMountLayer: null,
    terminated: null,
    isPriority: null,
    note: null,
  })

  const initEditingPerchMount = (perchMount: PerchMount) => {
    editingPerchMount.value.perch_mount_name = perchMount.perch_mount_name
    editingPerchMount.value.latitude = perchMount.latitude
    editingPerchMount.value.longitude = perchMount.longitude
    editingPerchMount.value.selectedClaimer = {
      code: perchMount.claimer?.id!,
      name: perchMount.claimer?.display_name!,
    }
    editingPerchMount.value.selectedHabitat = {
      code: perchMount.habitat,
      name: perchMount.habitat,
    }
    editingPerchMount.value.selectedMountLayer = {
      code: perchMount.mount_layer,
      name: perchMount.mount_layer,
    }
    editingPerchMount.value.terminated = perchMount.terminated
    editingPerchMount.value.isPriority = perchMount.is_priority
    editingPerchMount.value.note = perchMount.note
  }
  const updateByID = async (id: string, payload: PerchMountPatchPayload) => {
    error.value = null
    isUpdating.value = true
    try {
      await updatePerchMountByID(id, payload)
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

  return { error, isUpdating, editingPerchMount, initEditingPerchMount, updateByID }
}
