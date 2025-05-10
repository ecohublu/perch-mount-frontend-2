import type { Species } from '@/types/species'
import type { SearchResult } from '@/types/species'

export type UnreviewedIndividualsContents = {
  individual_id: string
  taxon_order_by_ai: number
  box_xmin: number | null
  box_xmax: number | null
  box_ymin: number | null
  box_ymax: number | null
  species_by_ai: Species
}

export type ReviewedIndividualsContents = {
  individual_id: string
  taxon_order_by_human: number
  box_xmin: number | null
  box_xmax: number | null
  box_ymin: number | null
  box_ymax: number | null
  species_by_human: Species
}

export type MarkedPreyIndividualsContents = {
  individual_id: string
  has_prey: boolean
}

export type IdentifiedPreyIndividualsContents = {
  individual_id: string
  inaturalist_taxa_id: number
  identifier_id: string
}

export type TaggedIndividualsContents = {
  individual_id: string
  is_tagged: boolean
  has_ring: boolean
  ring_number?: string | null
}

export type Individual = {
  id: string
  medium_id: string
  note?: string | null
  prey_status: 'unchecked' | 'unidentified' | 'no_prey' | 'identified' // 根據 enums.PreyStatus 定義調整
  unreviewed_contents: UnreviewedIndividualsContents | null
  reviewed_contents: ReviewedIndividualsContents | null
  marked_prey_contents: MarkedPreyIndividualsContents | null
  identified_prey_contents: IdentifiedPreyIndividualsContents | null
  tagged_contents?: TaggedIndividualsContents | null
}

export type ReviewingIndividual = {
  id: string
  selected_species: SearchResult | null
  box_xmin: number | null
  box_xmax: number | null
  box_ymin: number | null
  box_ymax: number | null
  has_prey: boolean
  is_tagged: boolean
  has_ring: boolean
  ring_number: string | null
  deleted: boolean
}

export type AIMissedReviewingIndividual = Omit<ReviewingIndividual, 'id'>

export type BoundingBox = {
  box_xmin: number
  box_xmax: number
  box_ymin: number
  box_ymax: number
}

export interface ReviewedIndividual {
  id?: string // optional 因為不是 required
  taxon_order_by_human: number
  box_xmin?: number | null
  box_xmax?: number | null
  box_ymin?: number | null
  box_ymax?: number | null
  has_prey: boolean
  is_tagged: boolean
  has_ring: boolean
  ring_number?: string | null
}

export function createEmptyAIMissedReviewingIndividual(
  boundingBox: BoundingBox | null = null,
): AIMissedReviewingIndividual {
  return {
    selected_species: null,
    box_xmin: boundingBox?.box_xmin ?? null,
    box_xmax: boundingBox?.box_xmax ?? null,
    box_ymin: boundingBox?.box_ymin ?? null,
    box_ymax: boundingBox?.box_ymax ?? null,
    has_prey: false,
    is_tagged: false,
    has_ring: false,
    ring_number: null,
    deleted: false,
  }
}

export function convertReviewingToReviewedIndividuals(
  individuals: AIMissedReviewingIndividual[] | ReviewingIndividual[],
): ReviewedIndividual[] {
  return individuals
    .filter((individual) => !individual.deleted)
    .map((individual) => {
      if (isReviewingIndividual(individual)) {
        return {
          id: individual.id,
          taxon_order_by_human: individual.selected_species?.code!,
          box_xmin: individual.box_xmin,
          box_xmax: individual.box_xmax,
          box_ymin: individual.box_ymax,
          box_ymax: individual.box_ymax,
          has_prey: individual.has_prey,
          is_tagged: individual.is_tagged,
          has_ring: individual.has_ring,
          ring_number: individual.ring_number,
        }
      } else {
        return {
          taxon_order_by_human: individual.selected_species?.code!,
          box_xmin: individual.box_xmin,
          box_xmax: individual.box_xmax,
          box_ymin: individual.box_ymax,
          box_ymax: individual.box_ymax,
          has_prey: individual.has_prey,
          is_tagged: individual.is_tagged,
          has_ring: individual.has_ring,
          ring_number: individual.ring_number,
        }
      }
    })
}

function isReviewingIndividual(
  individual: AIMissedReviewingIndividual | ReviewingIndividual,
): individual is ReviewingIndividual {
  return 'id' in individual
}
