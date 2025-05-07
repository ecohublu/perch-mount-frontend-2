import { ref } from 'vue'
import type { SelectedOption } from '@/types/options'
import { getMembers } from '@/services/perchAI/members'
import { convertMembersToSelectedOptions } from '@/types/member'

export function useMemberOptions() {
  const memberOptions = ref<Array<SelectedOption>>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const members = await getMembers()
      memberOptions.value = convertMembersToSelectedOptions(members)
    } catch (err) {
      error.value = err as Error
      memberOptions.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: memberOptions,
    isLoading,
    error,
    fetch,
  }
}
