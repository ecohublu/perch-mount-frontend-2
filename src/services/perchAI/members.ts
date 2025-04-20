import type { Member } from '@/types/member'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_MEMBERS_PATH = '/api/perchai/members/'

export const getPerchMounts = async (): Promise<Array<Member>> => {
  return await perchAIApi.get<Array<Member>>(ROOT_MEMBERS_PATH)
}

export const getPerchMountByID = async (id: string): Promise<Member> => {
  return await perchAIApi.get<Member>(`${ROOT_MEMBERS_PATH}${id}/`)
}
