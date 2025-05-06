export interface Project {
  name: string
  id: string
}

export interface AddingProject {
  name: string | null
}

export interface NewProject {
  name: string
}

export interface ProjectPatchPayload {
  name?: string
}

export function convertAddingtoNewProject(project: AddingProject): NewProject {
  return { name: project.name! }
}
