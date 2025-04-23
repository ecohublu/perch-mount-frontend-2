import { ref } from 'vue'
import { defineStore } from 'pinia'
import { shuffleArrayKeepFirst } from '@/utils/colors'
import { colors } from '@/constants/colors'

export const useColorLibraryStore = defineStore('colorLibrary', () => {
  const shuffledColors = ref<Array<string>>(shuffleArrayKeepFirst(colors))
  const getColorByIndex = (index: number): string => {
    return shuffledColors.value[index % shuffledColors.value.length]
  }
  const getBorderColorClassByIndex = (index: number): string => {
    return `border-${getColorByIndex(index)}`
  }
  const getBGColorClassByIndex = (index: number): string => {
    return `bg-${getColorByIndex(index)}`
  }

  return { shuffledColors, getColorByIndex, getBorderColorClassByIndex, getBGColorClassByIndex }
})
