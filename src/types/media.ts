import { useAuth } from '@/composables/useAuth'
import {
  type Individual,
  type ReviewingIndividual,
  type AIMissedReviewingIndividual,
  type ReviewedIndividual,
  convertReviewingToReviewedIndividuals,
} from '@/types/individuals'
import type { Behavior, Event } from '@/types/options'
import type { SelectedOption } from '@/types/options'
import type { SearchResult } from './species'

const auth = useAuth()

export type MediaQuery = {
  status: string // required

  // 可選參數
  perch_mount_ids?: string[] // UUID[]
  section_ids?: string[] // UUID[]
  is_tagged?: boolean
  ring_number_search?: string
  prey_status?: string
  has_prey?: boolean
  prey_inaturalist_taxa_ids?: number[]
  taxon_orders_by_human?: number[]
  taxon_orders_by_ai?: number[]
  limit?: number
  year?: number
  month?: number
}

export type UncheckedMediaQuery = {
  perch_mount_ids?: string[] // UUID[]
  section_ids?: string[] // UUID[]
  year?: number
  month?: number
}

export type Medium = {
  id: string
  section_id: string
  medium_type: 'image' | 'video' // 如果還有其他類型請補上
  status: 'undetected' | 'unchecked' | 'unreviewed' | 'reviewed' | 'accidental' // 可依後端 enums 定義補齊
  nas_path: string
  medium_datetime: string // ISO 格式 e.g. "2025-02-14T21:25:00"
  created_at: string // ISO 格式

  // 各內容狀態（nullable）
  detected_contents?: MediaDetectedContents | null
  unreviewued_contents?: UnreviewedMediaContents | null
  reviewed_contents?: ReviewedMediaContents | null
  unchecked_contents?: UncheckedMediaContents | null
  checked_contents?: MediaCheckedContents | null

  // 相關個體
  individuals: Individual[]
}

export type UncheckedMediaContents = {
  medium_id: string // UUID
}

export type UnreviewedMediaContents = {
  medium_id: string // UUID
}

export type MediaCheckedContents = {
  medium_id: string // UUID
  empty_checked_at?: string // ISO timestamp or null
  empty_checker_id?: string // UUID or null
}

export type MediaDetectedContents = {
  medium_id: string // UUID
  detected_at?: string // ISO timestamp or null
}

export type ReviewedMediaContents = {
  medium_id: string // UUID
  reviewed_at: string // ISO timestamp
  reviewer_id: string // UUID
  featured_by_id?: string // UUID or null
  event_id?: string // UUID or null
  behavior_id?: string // UUID or null
  behavior?: Behavior // 需要從其他檔案 import
  event?: Event // 需要從其他檔案 import
}

export type ReviewingMedium = {
  id: string
  selected_behavior: SelectedOption | null
  selected_event: SelectedOption | null
  individuals: ReviewingIndividual[]
  ai_missed_individuals: AIMissedReviewingIndividual[]
  note: string | null
}

export interface ReviewedMedium {
  id: string
  reviewed_at: string // ISO 格式的字串，例如 "2025-04-19T12:34:56Z"
  reviewer_id: string
  featured_by_id?: string | null
  event_id?: string | null
  behavior_id?: string | null
  individuals: ReviewedIndividual[]
}

export interface CheckedMedium {
  id: string // UUID
  empty_checked_at: string // ISO DateTime string (e.g., "2025-04-24T13:45:00.000Z")
  empty_checker_id: string // UUID
  has_individual: boolean
}

export interface HighlightFilter {
  mediumDatetimeFrom: Date | null
  mediumDatetimeTo: Date | null
  selectedBehaviors: SelectedOption[] | null
  selectedProjects: SelectedOption[] | null
  selectedPerchMounts: SelectedOption[] | null
  selectedTaxonOrder: SearchResult | null
  featuredById: string | null
}

export interface HighlightPramas {
  medium_datetime_from?: Date
  medium_datetime_to?: Date
  taxon_order: number
  behavior_ids?: string[]
  project_ids?: string[]
  perch_mount_ids?: string[]
  feature_by_id?: string
}

export interface HightlightResponse {
  media: Medium[]
  total: number
}

export function createMediaQuery(params: Partial<MediaQuery> & { status: string }): MediaQuery {
  return {
    status: params.status,
    ...(params.perch_mount_ids && { perch_mount_ids: params.perch_mount_ids }),
    ...(params.section_ids && { section_ids: params.section_ids }),
    ...(params.is_tagged !== undefined && { is_tagged: params.is_tagged }),
    ...(params.ring_number_search && { ring_number_search: params.ring_number_search }),
    ...(params.prey_status && { prey_status: params.prey_status }),
    ...(params.has_prey && { has_prey: params.has_prey }),
    ...(params.prey_inaturalist_taxa_ids && {
      prey_inaturalist_taxa_ids: params.prey_inaturalist_taxa_ids,
    }),
    ...(params.taxon_orders_by_human && { taxon_orders_by_human: params.taxon_orders_by_human }),
    ...(params.taxon_orders_by_ai && { taxon_orders_by_ai: params.taxon_orders_by_ai }),
  }
}

export function convertToReviewingMedia(media: Medium[]): ReviewingMedium[] {
  return media.map((medium) => {
    const individuals: ReviewingIndividual[] = medium.individuals.map((individual) => ({
      id: individual.id,
      selected_species:
        individual.unreviewed_contents !== null
          ? {
              chinese_common_name: individual.unreviewed_contents.species_by_ai.chinese_common_name,
              code: individual.unreviewed_contents.species_by_ai.taxon_order,
            }
          : null,
      box_xmin:
        individual.unreviewed_contents !== null ? individual.unreviewed_contents.box_xmin! : null,
      box_xmax:
        individual.unreviewed_contents !== null ? individual.unreviewed_contents.box_xmax! : null,
      box_ymin:
        individual.unreviewed_contents !== null ? individual.unreviewed_contents.box_ymin! : null,
      box_ymax:
        individual.unreviewed_contents !== null ? individual.unreviewed_contents.box_ymax! : null,

      has_prey: false,
      is_tagged: false,
      has_ring: false,
      ring_number: null,
      deleted: false,
    }))

    return {
      id: medium.id,
      selected_behavior: null,
      selected_event: null,
      individuals,
      ai_missed_individuals: [],
      note: null,
    }
  })
}

export async function convertReviewingToReviewedMedia(
  media: ReviewingMedium[],
): Promise<ReviewedMedium[]> {
  const currentTime = new Date(Date.now())
  const timeString = currentTime.toISOString()
  await auth.checkLogin()
  return media.map((medium) => {
    const individuals = []
    individuals.push(...convertReviewingToReviewedIndividuals(medium.individuals))
    individuals.push(...convertReviewingToReviewedIndividuals(medium.ai_missed_individuals))
    return {
      id: medium.id,
      reviewed_at: timeString,
      reviewer_id: auth.currentUser?.id!,
      featured_by_id: medium.selected_behavior ? auth.currentUser?.id : null,
      event_id: medium.selected_event?.code,
      behavior_id: medium.selected_behavior?.code,
      individuals: individuals,
    }
  })
}
