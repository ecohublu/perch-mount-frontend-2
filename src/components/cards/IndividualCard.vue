<template>
  <div class="card shadow-xl grid grid-cols-4 gap4">
    <div class="col-span-2">
      <InfoItemCard title="ID">{{ individual.id }}</InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="AI 物種">
        {{ individual.reviewed_contents?.species_by_human.chinese_common_name }}
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="物種">
        {{ individual.unreviewed_contents?.species_by_ai.chinese_common_name }}
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="獵物狀態">
        {{ individual.prey_status }}
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="iNat 獵物">
        {{ individual.identified_prey_contents?.inaturalist_taxa_id }}
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="獵物辨識 by">
        <MemberNameWithPhoto v-if="member !== null" :member="member"></MemberNameWithPhoto>
      </InfoItemCard>
    </div>
    <div></div>
    <div>
      <InfoItemCard title="有沒有標記">
        {{ individual.tagged_contents?.is_tagged }}
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="有沒有腳環">
        {{ individual.tagged_contents?.has_ring }}
      </InfoItemCard>
    </div>
    <div>
      <InfoItemCard title="環號">
        {{ individual.tagged_contents?.ring_number }}
      </InfoItemCard>
    </div>
    <div></div>
  </div>
</template>
<script setup lang="ts">
import type { Individual } from '@/types/individuals'
import InfoItemCard from './InfoItemCard.vue'
import MemberNameWithPhoto from '../MemberNameWithPhoto.vue'
import { useMember } from '@/composables/members/useMemberByID'
import { onMounted } from 'vue'
const porps = defineProps<{ individual: Individual }>()

const { data: member, isLoading, error, fetch } = useMember()

onMounted(() => {
  if (porps.individual.prey_status === 'identified') {
    fetch(porps.individual.identified_prey_contents?.identifier_id!)
  }
})
</script>
