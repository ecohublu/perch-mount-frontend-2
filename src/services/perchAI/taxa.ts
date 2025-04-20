import { perchAIApi } from '@/services/perchAI/api'
import type { SearchResult } from '@/types/species'

const ROOT_TAXA_PATH = '/api/taxa/predictions'

export const searchTaxaByPhrase = async (phrase: string): Promise<SearchResult[]> => {
  return await perchAIApi.get<SearchResult[]>(`${ROOT_TAXA_PATH}?phrase=${phrase}`)
}
