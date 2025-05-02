import type { NewPerchMount, PerchMount, PerchMountCount } from '@/types/perchMount'
import type { GetPerchMountsParams } from '@/types/perchMount'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_PERCH_MOUNT_PATH = '/api/perchai/perch_mounts/'

function serializeQueryParams(params: GetPerchMountsParams): string {
  const query = new URLSearchParams()

  if (params.project_ids?.length) {
    query.append('project_ids', params.project_ids.join(','))
  }

  if (params.claim_by_ids?.length) {
    query.append('claim_by_ids', params.claim_by_ids.join(','))
  }

  if (params.habitats?.length) {
    query.append('habitats', params.habitats.join(','))
  }

  if (typeof params.terminated === 'boolean') {
    query.append('terminated', String(params.terminated))
  }

  return query.toString()
}

export const getPerchMountsByQuery = async (
  params: GetPerchMountsParams = {},
): Promise<PerchMount[]> => {
  const queryString = serializeQueryParams(params)
  const url = queryString ? `${ROOT_PERCH_MOUNT_PATH}?${queryString}` : ROOT_PERCH_MOUNT_PATH

  return await perchAIApi.get<PerchMount[]>(url)
}

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

export const prioritizePerchMountByID = async (id: String) => {
  await perchAIApi.post(`${ROOT_PERCH_MOUNT_PATH}${id}/priority/`)
}

export const deprioritizePerchMountByID = async (id: String) => {
  await perchAIApi.del(`${ROOT_PERCH_MOUNT_PATH}${id}/priority/`)
}
export const activatePerchMountByID = async (id: String) => {
  await perchAIApi.post(`${ROOT_PERCH_MOUNT_PATH}${id}/activation/`)
}

export const deactivatePerchMountByID = async (id: String) => {
  await perchAIApi.del(`${ROOT_PERCH_MOUNT_PATH}${id}/activation/`)
}

export const claimPerchMountByID = async (id: String) => {
  await perchAIApi.post(`${ROOT_PERCH_MOUNT_PATH}${id}/claimby/me/`)
}

export const unclaimPerchMountByID = async (id: String) => {
  await perchAIApi.del(`${ROOT_PERCH_MOUNT_PATH}${id}/claimby/me/`)
}

export async function addPerchMount(perchMount: NewPerchMount) {
  return await perchAIApi.post<PerchMount>(`${ROOT_PERCH_MOUNT_PATH}`, { body: perchMount })
}
