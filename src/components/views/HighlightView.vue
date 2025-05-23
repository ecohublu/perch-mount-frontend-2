<template>
  <div class="card">
    <Panel toggleable>
      <HighlightFilter @search="handleSearchRequest"></HighlightFilter>
    </Panel>
  </div>
  <div class="card mt-8">
    <div v-if="media.length == 0">沒有找到精選影像...</div>
    <div v-else-if="isMediaLoading">
      <Loading></Loading>
    </div>
    <div v-else class="gap-6 grid">
      <Paginator
        :rows="50"
        :totalRecords="total"
        :rowsPerPageOptions="[50, 100]"
        @page="handlePageChange"
      ></Paginator>
      <div class="grid grid-cols-4 gap-6">
        <HightlightMediumCard v-for="medium of media" :medium="medium"></HightlightMediumCard>
      </div>
      <Paginator
        :rows="50"
        :totalRecords="total"
        :rowsPerPageOptions="[50, 100]"
        @page="handlePageChange"
      ></Paginator>
    </div>
  </div>
</template>
<script setup lang="ts">
import HighlightFilter from '../highlight/HighlightFilter.vue'
import HightlightMediumCard from '../cards/HightlightMediumCard.vue'
import { ref } from 'vue'
import { useHighlightMedia } from '@/composables/media/useHighlightFilter'
import type { HighlightFilter as HighlightFilterType } from '@/types/media'
import { useToast, type PageState } from 'primevue'
import Loading from '../Loading.vue'
const toast = useToast()

const currentFilter = ref<HighlightFilterType>({
  mediumDatetimeFrom: null,
  mediumDatetimeTo: null,
  selectedTaxonOrder: null,
  selectedBehaviors: [],
  selectedProjects: [],
  selectedPerchMounts: [],
  featuredById: null,
})

const {
  data: media,
  total: total,
  isLoading: isMediaLoading,
  error: mediaError,
  fetch: fetchMediaWithFilter,
} = useHighlightMedia(toast)

const handleSearchRequest = (filter: HighlightFilterType) => {
  fetchMediaWithFilter(filter, 0, 50)
  currentFilter.value = filter
}

const handlePageChange = (page: PageState) => {
  fetchMediaWithFilter(currentFilter.value, page.first, page.rows)
}
</script>
