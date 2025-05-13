import type { Member } from '@/types/member'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_MEMBERS_PATH = '/api/perchai/members/'

export const getMembers = async (): Promise<Array<Member>> => {
  return await perchAIApi.get<Array<Member>>(ROOT_MEMBERS_PATH)
}

export const getMemberByID = async (id: string): Promise<Member> => {
  return await perchAIApi.get<Member>(`${ROOT_MEMBERS_PATH}${id}/`)
}

export const activateMember = async (id: string) => {
  await perchAIApi.post(`${ROOT_MEMBERS_PATH}${id}/activation/`)
}

export const blockMember = async (id: string) => {
  await perchAIApi.post(`${ROOT_MEMBERS_PATH}${id}/block/`)
}

export const unblockMember = async (id: string) => {
  await perchAIApi.del(`${ROOT_MEMBERS_PATH}${id}/block/`)
}
