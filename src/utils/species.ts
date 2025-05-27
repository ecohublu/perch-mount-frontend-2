import type { Individual } from '@/types/individuals'
import type { SearchResult, Species } from '@/types/species'

export const shouldISearch = (event: any): boolean => {
  return true
}

export function converSpeciesToOptions(species: Species[]): SearchResult[] {
  return species.map((sp) => ({
    chinese_common_name: sp.chinese_common_name,
    code: sp.taxon_order,
  }))
}

export const joinIndividualsfield = (
  individuals: Array<Individual>,
  by: 'human' | 'ai',
  sep: string,
  field: keyof Species,
) => {
  const values = []
  for (const individual of individuals) {
    if (by == 'ai') {
      values.push(individual.unreviewed_contents?.species_by_ai[field])
    } else if (by == 'human') {
      values.push(individual.reviewed_contents?.species_by_human[field])
    }
  }
  return values.join(sep)
}
