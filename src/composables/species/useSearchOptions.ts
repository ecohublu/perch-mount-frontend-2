import { ref } from 'vue'
import { searchTaxaByPhrase } from '@/services/perchAI/taxa'
import type { SearchResult } from '@/types/species'

export function useSearchOptions() {
  const searchResults = ref<SearchResult[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetch = async (phrase: string) => {
    isLoading.value = true
    error.value = null
    try {
      searchResults.value = await searchTaxaByPhrase(phrase)
    } catch (err) {
      error.value = err as Error
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: searchResults,
    isLoading,
    error,
    fetch,
  }
}
