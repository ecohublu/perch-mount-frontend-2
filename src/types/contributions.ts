export interface GetContributionsParams {
  contributor_ids: string[]
  contribution_type?: string[]
  contributed_from?: string // ISO string
  contributed_to?: string // ISO string
}

export type ContributionType = 'REVIEW' | 'EMPTY_CHECK' | 'FLAIDENTIFY_PREYGGED'

export interface Contribution {
  id: string
  contribution_type: ContributionType
  counts: number
  contributor_id: string
  contribute_time: string
}
