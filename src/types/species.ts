export interface Species {
  endemism: string | null
  family_latin_name: string
  matzu_status: string
  taxon_order: number
  scientific_name: string
  chinese_common_name: string
  order: string
  family_name: string
  codes: string[]
  english_common_name: string
  kinmen_status: string
  pratas_status: string
  category: string
  conservation_status: string | null
  taiwan_status: string
}

export interface SearchResult {
  code: number
  chinese_common_name: string
}

export interface ReviewingInfo {}

export function isSearchResult(obj: any): obj is SearchResult {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.code === 'number' &&
    typeof obj.chinese_common_name === 'string'
  )
}
