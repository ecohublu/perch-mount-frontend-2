import { perchAIApi } from '@/services/perchAI/api'
import type { Species } from '@/types/species'

const ROOT_TAXA_PATH = '/api/perchai/species/'

export const getFreqOrderedSpecies = async (): Promise<Species[]> => {
  return await perchAIApi.get<Species[]>(`${ROOT_TAXA_PATH}?freq_ordered=true`)
}
