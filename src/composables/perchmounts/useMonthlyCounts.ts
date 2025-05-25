import { ref } from 'vue'
import { getPerchMountMonthlyCounts } from '@/services/perchAI/perchMounts'
import type { PerchMountMonthlyCount } from '@/types/perchMount'

export function usePerchMountMonthlyCounts() {
  const monthlyCounts = ref<PerchMountMonthlyCount[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      monthlyCounts.value = await getPerchMountMonthlyCounts(id)
    } catch (err) {
      error.value = err as Error
      monthlyCounts.value = []
    } finally {
      isLoading.value = false
    }
  }
  return {
    data: monthlyCounts,
    isLoading,
    error,
    fetch,
  }
}
