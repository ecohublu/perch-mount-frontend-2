import { getContributionsByQuery } from '@/services/perchAI/contributions'
import type { Contribution } from '@/types/contributions'
import { ref } from 'vue'

export function useMemberContributions() {
  const contributions = ref<Contribution[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async (memberID: string) => {
    isLoading.value = true
    error.value = null
    try {
      contributions.value = await getContributionsByQuery({ contributor_ids: [memberID] })
    } catch (err) {
      error.value = err as Error
      contributions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: contributions,
    isLoading,
    error,
    fetch,
  }
}
