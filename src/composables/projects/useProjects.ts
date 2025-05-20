import { ref } from 'vue'
import { getProjects } from '@/services/perchAI/projects'
import type { Project } from '@/types/project'
import { convertOptionsToSelectedOptions, type SelectedOption } from '@/types/options'

export function useProjects() {
  const projects = ref<Array<Project>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
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

export function useProjectOptions() {
  const projectOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const projects = await getProjects()
      projectOptions.value = convertOptionsToSelectedOptions(projects)
    } catch (err) {
      error.value = err as Error
      projectOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: projectOptions,
    isLoading,
    error,
    fetch,
  }
}
