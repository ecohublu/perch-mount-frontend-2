import { ref } from 'vue'
import { getMemberByID } from '@/services/perchAI/members'
import type { Member } from '@/types/member'

export function useMember() {
  const member = ref<Member | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      member.value = await getMemberByID(id)
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: member,
    isLoading,
    error,
    fetch,
  }
}
