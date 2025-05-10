import {
  convertReviewingToReviewedMedia,
  type ReviewedMedium,
  type ReviewingMedium,
} from '@/types/media'
import { delay } from '@/utils/timeOut'
import { ref } from 'vue'
import { useAuth } from '../useAuth'
import { addReviewedMedia } from '@/services/perchAI/media'

export function useReviewValidation() {
  const failedMarks = ref<boolean[]>([])
  const anyUnvalidated = ref<boolean>(false)
  const submitting = ref<boolean>(false)
  const submitted = ref<boolean>(false)
  const selectingSpecies = ref<string[]>()
  const error = ref<Error | null>(null)
  const initfailMarks = (mediaLength: number) => {
    failedMarks.value = Array(mediaLength).fill(false)
  }
  const validateReviewingMedia = (media: ReviewingMedium[]) => {
    media.forEach((medium, i) => {
      const allIndividuals = [...medium.individuals, ...medium.ai_missed_individuals]
      allIndividuals.forEach((individual) => {
        failedMarks.value[i] = !individual.deleted && !individual.selected_species
      })
    })
    anyUnvalidated.value = failedMarks.value.some((val) => val)
  }
  const refreshSelectingSpecies = (media: ReviewingMedium[]) => {
    const species = new Set<string>()
    media.forEach((medium) => {
      medium.individuals.forEach((individual) => {
        if (individual.selected_species) {
          species.add(individual.selected_species.chinese_common_name)
        }
      })
      medium.ai_missed_individuals.forEach((individual) => {
        if (individual.selected_species) {
          species.add(individual.selected_species.chinese_common_name)
        }
      })
    })
    selectingSpecies.value = [...species]
  }
  const submit = async (media: ReviewingMedium[]) => {
    const reviewedMedia = convertReviewingToReviewedMedia(media)
    console.log(reviewedMedia)
    submitting.value = true

    await addReviewedMedia(reviewedMedia)
    submitting.value = false
  }

  return {
    failedMarks,
    anyUnvalidated,
    submitted,
    submitting,
    selectingSpecies,
    error,
    initfailMarks,
    refreshSelectingSpecies,
    validateReviewingMedia,
    submit,
  }
}
