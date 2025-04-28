import type { SelectedOption } from './options'

export interface Member {
  id: string
  user_name: string | null
  display_name: string | null
  first_name: string
  last_name: string
  gmail: string | null
  profile_picture_url: string
  oidc_sub: string | null
  position: string
  is_admin: boolean
  is_super_admin: boolean
  activated: boolean
  blocked: boolean
}

export function convertMembersToSelectedOptions(members: Member[]): SelectedOption[] {
  const selectedOptions = [] as SelectedOption[]
  for (const member of members)
    selectedOptions.push({
      code: member.id,
      name: member.display_name ? member.display_name : `${member.last_name} ${member.first_name}`,
    })
  return selectedOptions
}
