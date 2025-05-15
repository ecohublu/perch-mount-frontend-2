import type { Contribution, GetContributionsParams } from '@/types/contributions'
import { perchAIApi } from './api'

function serializeContributionsQueryParams(params: GetContributionsParams): string {
  const query = new URLSearchParams()

  if (params.contributor_ids?.length) {
    query.append('contributor_ids', params.contributor_ids.join(','))
  }

  if (params.contribution_type?.length) {
    query.append('contribution_type', params.contribution_type.join(','))
  }

  if (params.contributed_from) {
    query.append('contributed_from', params.contributed_from)
  }

  if (params.contributed_to) {
    query.append('contributed_to', params.contributed_to)
  }

  return query.toString()
}

export const getContributionsByQuery = async (
  params: GetContributionsParams,
): Promise<Contribution[]> => {
  const queryString = serializeContributionsQueryParams(params)
  const url = `/api/contributions?${queryString}`

  return await perchAIApi.get<Contribution[]>(url)
}
