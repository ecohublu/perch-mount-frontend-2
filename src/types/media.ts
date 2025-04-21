import type {
  Individual,
  ReviewingIndividual,
  AIMissedReviewingIndividual,
} from '@/types/individuals'
import type { Behavior, Event } from '@/types/options'
import type { SelectedOption } from '@/types/options'

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
}

export type UncheckedMediaQuery = {
  perch_mount_ids?: string[] // UUID[]
  section_ids?: string[] // UUID[]
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
  detected_contents?: MediaCheckedContents | null
  unreviewued_contents?: UnreviewedMediaContents | null
  reviewed_contents?: ReviewedMediaContents | null
  unchecked_contents?: UncheckedMediaContents | null
  checked_contents?: MediaDetectedContents | null

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
      selected_species: null,
      box_xmin: null,
      box_xmax: null,
      box_ymin: null,
      box_ymax: null,
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
