import { ref } from 'vue'
import { getMembers } from '@/services/perchAI/members'
import type { Member } from '@/types/member'

export function useMembers() {
  const members = ref<Member[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      members.value = await getMembers()
    } catch (err) {
      error.value = err as Error
      members.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: members,
    isLoading,
    error,
    fetch,
  }
}
