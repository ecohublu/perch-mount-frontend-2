import { ref } from 'vue'

import { convertAddingtoNewProject, type AddingProject, type Project } from '@/types/project'
import { addProject } from '@/services/perchAI/projects'

export function useAddingProject() {
  const section = ref<AddingProject>({ name: null })
  const valid = ref<boolean>(false)
  const validate = () => {
    valid.value = section.value !== null && section.value.name !== null
  }
  const submitting = ref<boolean>(false)
  const addedProject = ref<Project | null>(null)
  const submitError = ref<Error | null>(null)
  const submit = async () => {
    submitting.value = true
    const newProject = convertAddingtoNewProject(section.value)
    console.log(newProject)
    try {
      addedProject.value = await addProject(newProject)
      submitting.value = false
    } catch (err) {
      submitError.value = err as Error
      submitting.value = false
    }
  }

  return { section, valid, validate, submitting, addedProject, submitError, submit }
}
