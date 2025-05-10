import { defineStore } from 'pinia'
import { getFreqOrderedSpecies } from '@/services/perchAI/species'
import { converSpeciesToOptions } from '@/utils/species'
import type { SearchResult } from '@/types/species'

export interface SpeciesOptionsState {
  options: SearchResult[]
  isLoading: boolean
}

export const useSpeciesOptionsStore = defineStore('speciesOptions', {
  state: (): SpeciesOptionsState => ({
    // 將初始狀態設置為空陣列或 null，等待數據載入
    options: [],
    isLoading: false, // 可以添加一個載入狀態，方便 UI 顯示載入中
  }),
  actions: {
    async fetch() {
      if (this.options.length !== 0) {
        return
      }
      this.isLoading = true // 開始載入
      try {
        const species = await getFreqOrderedSpecies()
        this.options = converSpeciesToOptions(species)
      } catch (err) {
      } finally {
        this.isLoading = false // 載入完成
      }
    },

    async forceRefetch() {
      this.isLoading = true // 開始載入
      try {
        const species = await getFreqOrderedSpecies()
        this.options = converSpeciesToOptions(species)
      } catch (err) {
      } finally {
        this.isLoading = false // 載入完成
      }
    },
  },
})
