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
