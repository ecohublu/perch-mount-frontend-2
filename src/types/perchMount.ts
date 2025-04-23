import type { Project } from '@/types/project'
import type { Member } from '@/types/member'

export interface GetPerchMountsParams {
  project_ids?: string[] // UUID[]
  claim_by_ids?: string[] // UUID[]
  habitats?: string[]
  terminated?: boolean
}

export type Habitat = 'artificial' | 'natural' | 'solar_panel'

export interface PerchMount {
  longitude: number
  perch_mount_name: string
  id: string
  habitat: Habitat
  latitude: number
  project_id: string
  claim_by_id: string | null
  claimer: Member | null
  terminated: boolean
  mount_layer: StringConstructor
  is_priority: boolean
  note: string | null
  project: Project
}

const habitatSeverityMap = {
  artificial: 'secondary',
  natural: 'success',
  solar_panel: 'contrast',
}

export const habitatToSeverity = (habitat: Habitat) => {
  return habitatSeverityMap[habitat]
}

export interface PerchMountCount {
  id: string
  perch_mount_name: string
  claimer_name: string
  claim_by_id: string
  claim_picture_url: string
  undetected_count: number
  unchecked_count: number
  unreviewed_count: number
  reviewed_count: number
  accidental_count: number
}

export interface PerchMountCountProportion {
  id: string
  perch_mount_name: string
  undetected: number
  unchecked: number
  unreviewed: number
  reviewed: number
}

export function convertToProportion(input: PerchMountCount): PerchMountCountProportion {
  const {
    id,
    perch_mount_name,
    undetected_count,
    unchecked_count,
    unreviewed_count,
    reviewed_count,
  } = input

  const total = undetected_count + unchecked_count + unreviewed_count + reviewed_count

  if (total === 0) {
    return {
      id,
      perch_mount_name,
      undetected: 0,
      unchecked: 0,
      unreviewed: 0,
      reviewed: 0,
    }
  }

  return {
    id,
    perch_mount_name,
    undetected: Math.floor((undetected_count / total) * 100),
    unchecked: Math.floor((unchecked_count / total) * 100),
    unreviewed: Math.floor((unreviewed_count / total) * 100),
    reviewed: Math.floor((reviewed_count / total) * 100),
  }
}
