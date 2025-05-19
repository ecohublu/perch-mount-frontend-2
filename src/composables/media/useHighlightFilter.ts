import { getHighlightByFilter, getMediaByFilter } from '@/services/perchAI/media'
import type { HighlightFilter, MediaQuery, Medium } from '@/types/media'
import { ref, watch } from 'vue'

export function useHighlightFilter() {
  const invalid = ref<boolean>(true)
  const filter = ref<HighlightFilter>({
    medium_datetime_from: null,
    medium_datetime_to: null,
    behavior_ids: [],
    project_ids: [],
    perch_mount_ids: [],
    featured_by_id: null,
  })
  watch(
    filter,
    (newFilter) => {
      // 檢查 filter 物件中的所有屬性
      // 只要其中一個屬性有值 (不是 null、undefined、空陣列)，invalid 就會是 false
      const hasValue =
        newFilter.medium_datetime_from !== null ||
        newFilter.medium_datetime_to !== null ||
        (newFilter.behavior_ids && newFilter.behavior_ids.length > 0) ||
        (newFilter.project_ids && newFilter.project_ids.length > 0) ||
        (newFilter.perch_mount_ids && newFilter.perch_mount_ids.length > 0) ||
        newFilter.featured_by_id !== null

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
      media.value = await getHighlightByFilter(filter)
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }
  return { data: media, isLoading, error, fetch }
}
