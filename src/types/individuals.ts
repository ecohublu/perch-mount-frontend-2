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
  selected_behavior: SearchResult | null
  box_xmin: number | null
  box_xmax: number | null
  box_ymin: number | null
  box_ymax: number | null
  has_prey: boolean
  is_tagged: boolean
  has_ring: boolean
  ring_number: string | null
}
