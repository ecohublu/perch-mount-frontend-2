import type { CheckedMedium, MediaQuery, Medium, ReviewedMedium } from '@/types/media'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_MEDIA_PATH = '/api/perchai/media/'
const ROOT_CHECK_PATH = '/api/perchai/checked_media/'
const ROOT_REVIEW_PATH = '/api/perchai/reviewed_media/'

export async function getMediaByFilter(params: MediaQuery): Promise<Array<Medium>> {
  const paramsURL = buildMediaQueryURL(params)
  return await perchAIApi.get<Array<Medium>>(`${ROOT_MEDIA_PATH}?${paramsURL.toString()}`)
}

export async function addCheckedMedia(media: CheckedMedium[]) {
  await perchAIApi.post(ROOT_CHECK_PATH, { body: media })
}

export async function addReviewedMedia(media: ReviewedMedium[]) {
  await perchAIApi.post(ROOT_REVIEW_PATH, { body: media })
}

export async function getMediumByID(id: string): Promise<Medium> {
  return await perchAIApi.get<Medium>(`${ROOT_MEDIA_PATH}${id}/`)
}

export async function rollbackReviewedMediumStatus(id: string): Promise<Medium> {
  return await perchAIApi.patch<Medium>(`${ROOT_MEDIA_PATH}${id}/status/`, {
    body: { status: 'unreviewed' },
  })
}

export async function updateMediumEvent(mediumId: string, eventId: string | null) {
  await perchAIApi.patch(`${ROOT_MEDIA_PATH}${mediumId}/`, { body: { event_id: eventId } })
}

export async function updateMediumFeature(
  mediumId: string,
  behaviorId: string | null,
  featuredById: string | null,
) {
  await perchAIApi.patch(`${ROOT_MEDIA_PATH}${mediumId}/`, {
    body: { behavior_id: behaviorId, featured_by_id: featuredById },
  })
}

function buildMediaQueryURL(query: MediaQuery): URLSearchParams {
  const params = new URLSearchParams()

  params.set('status', query.status)

  if (query.perch_mount_ids?.length) {
    params.set('perch_mount_ids', query.perch_mount_ids.join(','))
  }

  if (query.section_ids?.length) {
    params.set('section_ids', query.section_ids.join(','))
  }

  if (typeof query.is_tagged === 'boolean') {
    params.set('is_tagged', String(query.is_tagged))
  }

  if (query.ring_number_search) {
    params.set('ring_number_search', query.ring_number_search)
  }

  if (query.prey_status) {
    params.set('prey_status', query.prey_status)
  }

  if (typeof query.has_prey !== 'undefined') {
    params.set('has_prey', String(query.has_prey))
  }

  if (query.prey_inaturalist_taxa_ids?.length) {
    params.set('prey_inaturalist_taxa_ids', query.prey_inaturalist_taxa_ids.join(','))
  }

  if (query.taxon_orders_by_human?.length) {
    params.set('taxon_orders_by_human', query.taxon_orders_by_human.join(','))
  }

  if (query.taxon_orders_by_ai?.length) {
    params.set('taxon_orders_by_ai', query.taxon_orders_by_ai.join(','))
  }

  return params
}
