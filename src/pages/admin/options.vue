<template>
  <div class="grid grid-cols-3 gap-8">
    <div>
      <Card>
        <template #title>
          <CardHeader>行為</CardHeader>
        </template>
        <template #content>
          <DataTable :value="behaviorsOptions">
            <Column field="code" header="ID"></Column>
            <Column field="name" header="行為"></Column>
          </DataTable>
        </template>
        <template #footer>
          <Button label="增加行為" @click="addBehaviorVisible = true"></Button>
          <Dialog
            v-model:visible="addBehaviorVisible"
            modal
            header="增加行為"
            :style="{ width: '25rem' }"
          >
            <div class="grid grid-cols-1 gap-8">
              <div>
                <InfoItemCard title="行為">
                  <InputText class="w-full"></InputText>
                </InfoItemCard>
              </div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="addBehaviorVisible = false"
                ></Button>
                <Button type="button" label="確定" @click="handleAddBehaviorClick"></Button>
              </div>
            </div>
          </Dialog>
        </template>
      </Card>
    </div>
    <div>
      <Card>
        <template #title>
          <CardHeader>相機</CardHeader>
        </template>
        <template #content>
          <DataTable :value="cameraOptions">
            <Column field="code" header="ID"></Column>
            <Column field="name" header="型號"></Column>
          </DataTable>
        </template>
        <template #footer>
          <Button label="增加相機型號" @click="addCameraVisible = true"></Button>
          <Dialog
            v-model:visible="addCameraVisible"
            modal
            header="增加相機型號"
            :style="{ width: '25rem' }"
          >
            <div class="grid grid-cols-1 gap-8">
              <div>
                <InfoItemCard title="型號">
                  <InputText class="w-full"></InputText>
                </InfoItemCard>
              </div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="addCameraVisible = false"
                ></Button>
                <Button type="button" label="確定" @click="handleAddCameraClick"></Button>
              </div>
            </div>
          </Dialog>
        </template>
      </Card>
    </div>
    <div>
      <Card>
        <template #title>
          <CardHeader>棲架類型</CardHeader>
        </template>
        <template #content>
          <DataTable :value="mountTypeOptions">
            <Column field="code" header="ID"></Column>
            <Column field="name" header="棲架類型"></Column>
          </DataTable>
        </template>
        <template #footer>
          <Button label="增加棲架類型" @click="addMountTypeVisible = true"></Button>
          <Dialog
            v-model:visible="addMountTypeVisible"
            modal
            header="增加棲架類型"
            :style="{ width: '25rem' }"
          >
            <div class="grid grid-cols-1 gap-8">
              <div>
                <InfoItemCard title="類型">
                  <InputText class="w-full"></InputText>
                </InfoItemCard>
              </div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="addMountTypeVisible = false"
                ></Button>
                <Button type="button" label="確定" @click="handleAddMountTypeClick"></Button>
              </div>
            </div>
          </Dialog>
        </template>
      </Card>
    </div>
    <div>
      <Card>
        <template #title>
          <CardHeader>事件</CardHeader>
        </template>
        <template #content>
          <DataTable :value="eventOptions">
            <Column field="code" header="ID"></Column>
            <Column field="name" header="事件"></Column>
          </DataTable>
        </template>
        <template #footer>
          <Button label="增加事件" @click="addEventVisible = true"></Button>
          <Dialog
            v-model:visible="addEventVisible"
            modal
            header="增加事件"
            :style="{ width: '25rem' }"
          >
            <div class="grid grid-cols-1 gap-8">
              <div>
                <InfoItemCard title="事件｀｀">
                  <InputText class="w-full"></InputText>
                </InfoItemCard>
              </div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="addEventVisible = false"
                ></Button>
                <Button type="button" label="確定" @click="handleAddEventClick"></Button>
              </div>
            </div>
          </Dialog>
        </template>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBehaviorOptions } from '@/composables/options/useBehaviors'
import { useCameraOptions } from '@/composables/options/useCameras'
import { useMountTypeOptions } from '@/composables/options/useMountTypes'
import { onMounted, ref } from 'vue'
import CardHeader from '@/components/CardHeader.vue'
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import { useEventOptions } from '@/composables/options/useEvents'
const addBehaviorVisible = ref<boolean>(false)
const addCameraVisible = ref<boolean>(false)
const addMountTypeVisible = ref<boolean>(false)
const addEventVisible = ref<boolean>(false)

const {
  data: behaviorsOptions,
  isLoading: isBehaviorsLoading,
  error: behaviorsError,
  fetch: fetchBehviors,
} = useBehaviorOptions()

const {
  data: cameraOptions,
  isLoading: isCamerasLoading,
  error: camerasError,
  fetch: fetchCameras,
} = useCameraOptions()

const {
  data: mountTypeOptions,
  isLoading: isMountTypesLoading,
  error: mountTypesError,
  fetch: fetchMountTypes,
} = useMountTypeOptions()
const {
  data: eventOptions,
  isLoading: isEventsLoading,
  error: eventsError,
  fetch: fetchEvents,
} = useEventOptions()

onMounted(() => {
  fetchBehviors()
  fetchCameras()
  fetchMountTypes()
  fetchEvents()
})

const handleAddBehaviorClick = () => {}
const handleAddCameraClick = () => {}
const handleAddMountTypeClick = () => {}
const handleAddEventClick = () => {}
</script>
