import { ref } from 'vue'
import { getProjectByID } from '@/services/perchAI/projects'
import type { Project } from '@/types/project'

export function useProjectByID(id: String) {
  const project = ref<Project | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      project.value = await getProjectByID(id)
    } catch (err) {
      error.value = err as Error
      project.value = null
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: project,
    isLoading,
    error,
    fetch,
  }
}
