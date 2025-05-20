import {
  convertHighlightFilterToURLParams,
  getHighlightByFilter,
  getMediaByFilter,
} from '@/services/perchAI/media'
import type { HighlightFilter, MediaQuery, Medium } from '@/types/media'
import { ref, watch } from 'vue'

export function useHighlightFilter() {
  const invalid = ref<boolean>(true)
  const filter = ref<HighlightFilter>({
    mediumDatetimeFrom: null,
    mediumDatetimeTo: null,
    selectedBehaviors: [],
    selectedProjects: [],
    selectedPerchMounts: [],
    featuredById: null,
  })
  watch(
    filter,
    (newFilter) => {
      // 檢查 filter 物件中的所有屬性
      // 只要其中一個屬性有值 (不是 null、undefined、空陣列)，invalid 就會是 false
      const hasValue =
        newFilter.mediumDatetimeFrom !== null ||
        newFilter.mediumDatetimeTo !== null ||
        (newFilter.selectedBehaviors && newFilter.selectedBehaviors.length > 0) ||
        (newFilter.selectedProjects && newFilter.selectedProjects.length > 0) ||
        (newFilter.selectedPerchMounts && newFilter.selectedPerchMounts.length > 0) ||
        newFilter.featuredById !== null

      invalid.value = !hasValue // 如果有任何一個值，invalid 就設為 false，否則設為 true
    },
    { deep: true }, // 使用 deep: true 來偵測物件內部屬性的變化
  )

  return { invalid, filter }
}

export function useHighlightMedia() {
  const media = ref<Medium[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const fetch = async (filter: HighlightFilter) => {
    isLoading.value = true
    error.value = null
    try {
      const params = convertHighlightFilterToURLParams(filter)
      media.value = await getHighlightByFilter(params)
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }
  return { data: media, isLoading, error, fetch }
}
