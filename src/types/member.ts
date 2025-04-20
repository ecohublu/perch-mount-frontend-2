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
