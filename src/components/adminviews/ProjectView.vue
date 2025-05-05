<template>
  <Splitter>
    <SplitterPanel class="flex justify-center p-8" :size="25" :minSize="10">
      <ProjectEditor :id="id"></ProjectEditor>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center" :size="75">
      <div class="card">
        <div class="card">
          <DataTable :value="perchMounts" size="small">
            <Column field="id" header="ID">
              <template #body="slotProps">
                <router-link :to="`/admin/perchmounts/${slotProps.data.id}`">{{
                  slotProps.data.id
                }}</router-link>
              </template>
            </Column>
            <Column field="perch_mount_name" header="棲架名稱">
              <template #body="slotProps">
                <router-link :to="`/admin/perchmounts/${slotProps.data.id}`">{{
                  slotProps.data.perch_mount_name
                }}</router-link>
              </template>
            </Column>
            <Column field="habitat" header="棲地" sortable></Column>
            <Column field="mount_layer" header="分層" sortable></Column>

            <Column header="座標">
              <template #body="slotProps">
                {{ slotProps.data.longitude }}, {{ slotProps.data.latitude }}
              </template>
            </Column>
            <Column header="認領人">
              <template #body="slotProps">
                <MemberNameWithPhoto
                  v-if="slotProps.data.claimer"
                  :member="slotProps.data.claimer"
                ></MemberNameWithPhoto>
              </template>
            </Column>
            <Column field="is_priority" header="優先處裡" sortable> </Column>
            <Column field="terminated" header="撤銷" sortable> </Column>
            <Column header="app">
              <template #body="slotProps">
                <Button size="small" severity="info" variant="outlined">
                  <PerchMountSpan
                    :id="slotProps.data.id"
                    :name="`${slotProps.data.perch_mount_name} in app`"
                  ></PerchMountSpan>
                </Button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import { usePerchMountsByQuery } from '@/composables/perchmounts/usePerchMountsByProjectID'
import { onMounted } from 'vue'

import { useMembers } from '@/composables/members/useMembers'
import MemberNameWithPhoto from '@/components/MemberNameWithPhoto.vue'
import PerchMountSpan from '@/components/nameSpans/PerchMountSpan.vue'
import ProjectEditor from '@/components/adminviews/editors/ProjectEditor.vue'

const props = defineProps<{
  id: string
}>()

const {
  data: perchMounts,
  workingCount,
  terminatedCount,
  isLoading: isPerchMountsLoading,
  error: perchMountsError,
  fetch: fetchPerchMounts,
} = usePerchMountsByQuery({ project_ids: [props.id] })

const {
  data: members,
  isLoading: isMembersLoading,
  error: memberError,
  fetch: fetchMembers,
} = useMembers()

onMounted(async () => {
  await fetchPerchMounts()
  await fetchMembers()
})
</script>
