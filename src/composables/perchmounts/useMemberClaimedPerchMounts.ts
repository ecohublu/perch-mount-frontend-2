import { computed, ref } from 'vue'
import { getPerchMountsByQuery } from '@/services/perchAI/perchMounts'
import type { PerchMount } from '@/types/perchMount'

export function useMemberClaimedPerchMounts() {
  const perchMounts = ref<Array<PerchMount>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async (memberId: string) => {
    isLoading.value = true
    error.value = null
    try {
      perchMounts.value = await getPerchMountsByQuery({ claim_by_ids: [memberId] })
    } catch (err) {
      error.value = err as Error
      perchMounts.value = []
    } finally {
      isLoading.value = false
    }
  }

  const workingCount = computed(
    () => perchMounts.value.filter((m) => m.terminated === false).length,
  )
  const terminatedCount = computed(
    () => perchMounts.value.filter((m) => m.terminated === true).length,
  )
  return {
    data: perchMounts,
    workingCount,
    terminatedCount,
    isLoading,
    error,
    fetch,
  }
}
