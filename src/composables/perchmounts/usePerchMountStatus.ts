import { ref } from 'vue'
import {
  activatePerchMountByID,
  claimPerchMountByID,
  deactivatePerchMountByID,
  deprioritizePerchMountByID,
  prioritizePerchMountByID,
  unclaimPerchMountByID,
} from '@/services/perchAI/perchMounts'

export function usePerchMountStatus(id: String) {
  const error = ref<Error | null>(null)
  const isUpdating = ref<boolean>(false)
  const prioritize = async () => {
    error.value = null
    isUpdating.value = true
    try {
      await prioritizePerchMountByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }
  const deprioritize = async () => {
    error.value = null
    isUpdating.value = true
    try {
      await deprioritizePerchMountByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }
  const activate = async () => {
    error.value = null
    isUpdating.value = true
    try {
      await activatePerchMountByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }
  const deactivate = async () => {
    error.value = null
    isUpdating.value = true
    try {
      await deactivatePerchMountByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }

  const claim = async () => {
    error.value = null
    isUpdating.value = true
    try {
      await claimPerchMountByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }

  const unclaim = async () => {
    error.value = null
    isUpdating.value = true
    try {
      await unclaimPerchMountByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isUpdating.value = false
    }
  }

  return {
    error,
    prioritize,
    deprioritize,
    activate,
    deactivate,
    claim,
    unclaim,
  }
}
