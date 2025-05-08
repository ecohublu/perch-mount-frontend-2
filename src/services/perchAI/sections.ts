import type { NewSection, Section, SectionPatchPayload, SectionsQuery } from '@/types/sections'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_SECTIONS_PATH = '/api/perchai/sections/'

export async function getSectionsByFilter(params: SectionsQuery): Promise<any> {
  const query = new URLSearchParams()

  if (params.perch_mount_ids?.length) {
    query.append('perch_mount_ids', params.perch_mount_ids.join(','))
  }

  if (params.swapped_date_from) {
    query.append('swapped_date_from', params.swapped_date_from)
  }

  if (params.swapped_date_to) {
    query.append('swapped_date_to', params.swapped_date_to)
  }

  if (params.swapper_ids?.length) {
    query.append('swapper_ids', params.swapper_ids.join(','))
  }

  return await perchAIApi.get<Array<Section>>(`${ROOT_SECTIONS_PATH}?${query.toString()}`)
}

export async function getSectionsByID(id: string): Promise<Section> {
  return await perchAIApi.get<Section>(`${ROOT_SECTIONS_PATH}${id}/`)
}

export async function addSection(section: NewSection) {
  return await perchAIApi.post<Section>(`${ROOT_SECTIONS_PATH}`, { body: section })
}

export async function deleteSectionByID(id: string) {
  return await perchAIApi.del(`${ROOT_SECTIONS_PATH}${id}/`)
}

export async function updateSectionByID(id: string, payload: SectionPatchPayload) {
  return await perchAIApi.patch(`${ROOT_SECTIONS_PATH}${id}/`, { body: payload })
}

export async function shiftSectionTime(id: string, start_time: string) {
  return await perchAIApi.patch(`${ROOT_SECTIONS_PATH}${id}/time/`, {
    body: { start_time: start_time },
  })
}

export async function updateSectionSwappers(id: string, swapperIds: string[]) {
  return await perchAIApi.put(`${ROOT_SECTIONS_PATH}${id}/swappers/`, {
    body: { swapper_ids: swapperIds },
  })
}
