import { ref } from 'vue'
import { addCamera, getCameras } from '@/services/perchAI/options'
import { convertOptionsToSelectedOptions, type Camera, type SelectedOption } from '@/types/options'

export function useCameras() {
  const cameras = ref<Camera[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      cameras.value = await getCameras()
    } catch (err) {
      error.value = err as Error
      cameras.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: cameras,
    isLoading,
    error,
    fetch,
  }
}

export function useCameraOptions() {
  const cameraOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const cameras = await getCameras()
      cameraOptions.value = convertOptionsToSelectedOptions(cameras)
    } catch (err) {
      error.value = err as Error
      cameraOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: cameraOptions,
    isLoading,
    error,
    fetch,
  }
}

export function useAddCamera(toast: any = null) {
  const editingData = ref<string | null>(null)
  const isAdding = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetchAdd = async () => {
    isAdding.value = true
    error.value = null
    try {
      await addCamera(editingData.value!)
      if (toast) {
        toast.add(localSuccessToast(editingData.value!))
      }
    } catch (err) {
      error.value = err as Error
      if (toast) {
        toast.add(localErrorToast(err as string))
      }
      isAdding.value = false
    }
  }

  return { editingData, isAdding, error, fetchAdd }
}

function localErrorToast(message: string) {
  return { severity: 'error', summary: 'Add Camera Failed', detail: message, life: 10000 }
}
function localSuccessToast(message: string) {
  return { severity: 'success', summary: 'Add Camera Successed', detail: message, life: 10000 }
}
