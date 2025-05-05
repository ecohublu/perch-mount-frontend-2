<template>
  <DataTable :value="props.media">
    <Column field="id" header="Medium ID">
      <template #body="slotProps">
        <router-link :to="`/admin/media/${slotProps.data.id}`">
          {{ slotProps.data.id }}
        </router-link>
      </template>
    </Column>
    <Column field="medium_type" header="Medium Type"></Column>
    <Column field="medium_datetime" header="Medium Datetime" sortable></Column>
    <Column v-if="undetected" field="created_at" header="Created at"></Column>

    <Column v-if="unchecked || unreviewed" header="Detected at">
      <template #body="slotProps">
        {{ slotProps.data.detected_contents.detected_at }}
      </template>
    </Column>

    <Column v-if="unreviewed" header="Species by AI">
      <template #body="slotProps">
        {{ joinIndividualsfield(slotProps.data.individuals, 'ai', ', ', 'chinese_common_name') }}
      </template>
    </Column>

    <Column v-if="reviewed" header="Species by Human">
      <template #body="slotProps">
        {{ joinIndividualsfield(slotProps.data.individuals, 'human', ', ', 'chinese_common_name') }}
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import type { Medium } from '@/types/media'
import { ref } from 'vue'
import type { Individual } from '@/types/individuals'
import type { Species } from '@/types/species'

const props = defineProps<{
  media_status: 'undetected' | 'unchecked' | 'unreviewed' | 'reviewed'
  media: Medium[]
}>()

const undetected = ref<boolean>(props.media_status == 'undetected')
const unchecked = ref<boolean>(props.media_status == 'unchecked')
const unreviewed = ref<boolean>(props.media_status == 'unreviewed')
const reviewed = ref<boolean>(props.media_status == 'reviewed')

const joinIndividualsfield = (
  individuals: Array<Individual>,
  by: 'human' | 'ai',
  sep: string,
  field: keyof Species,
) => {
  const values = []
  for (const individual of individuals) {
    if (by == 'ai') {
      values.push(individual.unreviewed_contents?.species_by_ai[field])
    }
  }
  return values.join(sep)
}
</script>
