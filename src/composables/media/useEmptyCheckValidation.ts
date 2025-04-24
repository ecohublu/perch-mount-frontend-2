import { ref } from 'vue'
import type { CheckedMedium, Medium } from '@/types/media'

import { delay } from '@/utils/timeOut'
import { useAuth } from '@/composables/useAuth'

const auth = useAuth()

export function useEmptyCheckSubmission() {
  const mediaAiMissedMarks = ref<Array<boolean>>([])
  const aiMissedCount = ref<number>(0)
  const submitting = ref<boolean>(false)
  const submitted = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const initCheckes = (mediaLength: number) => {
    mediaAiMissedMarks.value = Array(mediaLength).fill(false)
  }
  const clickMediumByIndex = (index: number) => {
    mediaAiMissedMarks.value[index] = !mediaAiMissedMarks.value[index]
  }

  const refreshCount = () => {
    aiMissedCount.value = mediaAiMissedMarks.value.filter((val) => val).length
  }

  const submit = async (media: Medium[]) => {
    submitting.value = true
    const checkMedia = convertMediaToCheckedMedia(media, mediaAiMissedMarks.value)
    await delay(1000)
    submitting.value = false
    submitted.value = true

    console.log(checkMedia)
  }

  return {
    mediaAiMissedMarks,
    aiMissedCount,
    submitting,
    submitted,
    error,
    initCheckes,
    clickMediumByIndex,
    refreshCount,
    submit,
  }
}

function convertMediaToCheckedMedia(media: Medium[], missedMarks: boolean[]): CheckedMedium[] {
  const now: Date = new Date()
  const nowIsoString: string = now.toISOString()
  const checkedMedia = [] as CheckedMedium[]
  for (let i = 0; i < media.length; i++) {
    checkedMedia.push({
      id: media[i].id,
      empty_checked_at: nowIsoString,
      empty_checker_id: auth.currentUser!.id,
      has_individual: missedMarks[i],
    })
  }
  return checkedMedia
}
