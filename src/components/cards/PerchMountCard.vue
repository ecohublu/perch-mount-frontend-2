<template>
  <Card class="min-w-xs">
    <template #title>
      <div class="flex justify-between">
        <div class="flex">
          <div v-if="info.claimer != null">
            <Avatar :image="info.claimer.profile_picture_url" shape="circle" />
          </div>
          <div class="flex">
            <PerchMountSpan
              :id="info.id"
              :name="info.perch_mount_name"
              class="ms-2"
              :class="{ 'opacity-50': info.terminated, 'font-semibold': !info.terminated }"
            ></PerchMountSpan>
          </div>
        </div>
        <router-link :to="`/app/projects/${info.project_id}`">
          <Badge severity="secondary">{{ info.project.name }}</Badge>
        </router-link>
      </div>
      <div class="">
        <a target="_blank" :href="parseGoogleMapPointURL(info.latitude, info.longitude)">
          <Tag
            icon="pi pi-map-marker"
            severity="secondary"
            :value="`${info.longitude}, ${info.latitude}`"
          ></Tag>
        </a>
      </div>
      <div class="flex flex-wrap mt-2">
        <Badge class="me-3" :severity="habitatToSeverity(info.habitat)">{{ info.habitat }}</Badge>
        <Badge class="me-3" v-if="info.is_priority" severity="danger">優先處理</Badge>
      </div>
    </template>
    <template #content>
      <p class="m-0 truncate">{{ info.note }}</p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { PerchMount } from '@/types/perchMount'
import { habitatToSeverity } from '@/types/perchMount'
import { Badge } from 'primevue'
import { ref } from 'vue'
import { parseGoogleMapPointURL } from '@/utils/googleMap'

import PerchMountSpan from '@/components/nameSpans/PerchMountSpan.vue'

const props = defineProps<{
  info: PerchMount
}>()

const TitleClassObject = ref({
  'dark:text-stone-300': props.info.terminated,
  'text-stone-300': props.info.terminated,
  italic: props.info.terminated,
})
</script>
