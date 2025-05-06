import type { NewProject, Project, ProjectPatchPayload } from '@/types/project'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_PROJECTS_PATH = '/api/perchai/projects/'

export const getProjects = async (): Promise<Array<Project>> => {
  return await perchAIApi.get<Array<Project>>(ROOT_PROJECTS_PATH)
}

export const getProjectByID = async (id: String): Promise<Project> => {
  return await perchAIApi.get<Project>(`${ROOT_PROJECTS_PATH}${id}/`)
}
export const addProject = async (newProject: NewProject): Promise<Project> => {
  return await perchAIApi.post<Project>(ROOT_PROJECTS_PATH, { body: newProject })
}

export const updateProjectByID = async (id: string, payload: ProjectPatchPayload) => {
  return await perchAIApi.patch<Project>(`${ROOT_PROJECTS_PATH}${id}/`, { body: payload })
}
