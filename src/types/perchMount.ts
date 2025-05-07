import type { Project } from '@/types/project'
import type { Member } from '@/types/member'
import type { SelectedOption } from './options'

export interface GetPerchMountsParams {
  project_ids?: string[] // UUID[]
  claim_by_ids?: string[] // UUID[]
  habitats?: string[]
  terminated?: boolean
}

export type Habitat = 'artificial' | 'natural' | 'solar_panel'

export interface PerchMount {
  id: string
  longitude: number
  perch_mount_name: string
  habitat: Habitat
  latitude: number
  project_id: string
  claim_by_id: string | null
  claimer: Member | null
  terminated: boolean
  mount_layer: string
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

export interface AddingPerchMount {
  perch_mount_name: string | null
  latitude: number | null
  longitude: number | null
  selectedHabitat: SelectedOption | null
  selectedProject: SelectedOption | null
  selectedMountLayer: SelectedOption | null
  note: string | null
}
export type NewPerchMount = Omit<
  PerchMount,
  'id' | 'claimer' | 'claim_by_id' | 'is_priority' | 'project' | 'terminated'
>

export interface EditingPerchMount {
  perch_mount_name: string | null
  latitude: number | null
  longitude: number | null
  selectedClaimer: SelectedOption | null
  selectedHabitat: SelectedOption | null
  selectedMountLayer: SelectedOption | null
  terminated: boolean | null
  isPriority: boolean | null
  note: string | null
}

export interface PerchMountPatchPayload {
  perch_mount_name?: string
  longitude?: number
  latitude?: number
  habitat?: string
  claim_by_id?: string | null // 通常 ID 類型會保持為 string (UUID)
  mount_layer?: string
  terminated?: boolean
  is_priority?: boolean
  note?: string | null
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

export function convertPerchMountsToSelectedOptions(perchMounts: PerchMount[]): SelectedOption[] {
  const selectedOptions = [] as SelectedOption[]
  for (const perchMount of perchMounts) {
    selectedOptions.push({
      code: perchMount.id,
      name: perchMount.perch_mount_name,
    })
  }
  return selectedOptions
}

export function convertAddingToNewPerchMount(perchMount: AddingPerchMount): NewPerchMount {
  return {
    perch_mount_name: perchMount.perch_mount_name!,
    latitude: perchMount.latitude!,
    longitude: perchMount.longitude!,
    mount_layer: perchMount.selectedMountLayer!.name,
    habitat: perchMount.selectedHabitat!.name as Habitat,
    project_id: perchMount.selectedProject!.code,
    note: perchMount.note,
  }
}
