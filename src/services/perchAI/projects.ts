import type { Project } from '@/types/project'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_PROJECTS_PATH = '/api/perchai/projects/'

export const getProjects = async (): Promise<Array<Project>> => {
  return await perchAIApi.get<Array<Project>>(ROOT_PROJECTS_PATH)
}
