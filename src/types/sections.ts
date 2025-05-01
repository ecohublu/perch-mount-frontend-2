import type { Member } from '@/types/member'
import type { MountType, SelectedOption } from '@/types/options'
import type { Camera } from '@/types/options'

export interface NewSection {
  perch_mount_id: string
  mount_type_id: string
  camera_id: string
  swapped_date: string // e.g. "2025-01-14"
  swapper_ids: string[]
  note: string | null
  valid: boolean
}

export interface AddingSection {
  selectedPerchMount: SelectedOption | null
  swapped_date: Date | null // e.g. "2025-01-14"
  selectedCamera: SelectedOption | null
  selectedMountType: SelectedOption | null
  selectedMembers: SelectedOption[]
  note: string | null
  valid: boolean
}

export interface Section {
  id: string
  perch_mount_id: string
  mount_type_id: string
  camera_id: string
  swapped_date: string // e.g. "2025-01-14"
  start_time: string // e.g. "2025-01-14 09:59:00"
  end_time: string // e.g. "2025-01-24 09:59:00"
  note: string | null
  valid: boolean

  accidental_count: number
  unchecked_count: number
  unreviewed_count: number
  reviewed_count: number
  undetected_count: number

  camera: Camera
  mount_type: MountType

  swappers: Member[]
}

export interface SectionsQuery {
  perch_mount_ids?: string[] // 多個 ID，用逗號分隔
  swapped_date_from?: string | null // ISO 字串
  swapped_date_to?: string | null // ISO 字串
  swapper_ids?: string[] // 多個 UUID，用逗號分隔
}

export function convertAddingToNewSection(section: AddingSection): NewSection {
  return {
    perch_mount_id: section.selectedPerchMount?.code!,
    mount_type_id: section.selectedMountType?.code!,
    camera_id: section.selectedCamera?.code!,
    swapped_date: section.swapped_date!.toISOString().split('T')[0],
    swapper_ids: section.selectedMembers.map((member) => member.code),
    note: section.note,
    valid: section.valid,
  }
}
