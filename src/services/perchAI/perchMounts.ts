import type { PerchMount, PerchMountCount } from '@/types/perchMount'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_PERCH_MOUNT_PATH = '/api/perchai/perch_mounts/'

export const getPerchMounts = async (): Promise<Array<PerchMount>> => {
  return await perchAIApi.get<Array<PerchMount>>(ROOT_PERCH_MOUNT_PATH)
}

export const getPerchMountByID = async (id: String): Promise<PerchMount> => {
  return await perchAIApi.get<PerchMount>(`${ROOT_PERCH_MOUNT_PATH}${id}/`)
}

export const getPerchMountsCounts = async (): Promise<Array<PerchMountCount>> => {
  return await perchAIApi.get<Array<PerchMountCount>>(`${ROOT_PERCH_MOUNT_PATH}pending_counts/`)
}

export const getPerchMountCountByID = async (id: String): Promise<PerchMountCount> => {
  return await perchAIApi.get<PerchMountCount>(`${ROOT_PERCH_MOUNT_PATH}${id}/pending_counts/`)
}
