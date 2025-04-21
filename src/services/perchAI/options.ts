import type { Behavior } from '@/types/options'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_MEMBERS_PATH = '/api/perchai/behaviors/'

export const getBehaviors = async (): Promise<Array<Behavior>> => {
  return await perchAIApi.get<Array<Behavior>>(ROOT_MEMBERS_PATH)
}
