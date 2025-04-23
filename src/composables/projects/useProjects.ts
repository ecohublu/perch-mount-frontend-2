import { ref } from 'vue'
import { getProjects } from '@/services/perchAI/projects'
import type { Project } from '@/types/project'

const projects = ref<Array<Project>>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)

export function useProjects() {
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      projects.value = await getProjects()
    } catch (err) {
      error.value = err as Error
      projects.value = []
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: projects,
    isLoading,
    error,
    fetch,
  }
}
