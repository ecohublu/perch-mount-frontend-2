<template>
  <div class="flex flex-col gap-2 my-6">
    <label>棲架 ID</label>
    <InputText :model-value="perchMountId" disabled />
  </div>
  <div class="grid grid-cols-2 gap-4 my-6">
    <div class="flex flex-col gap-2">
      <label>相機</label>
      <Select
        :options="cemeraOptions"
        optionLabel="name"
        placeholder="Select a Camera"
        class="w-full"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label>支架類型</label>
      <Select
        :options="mountTypeOptions"
        optionLabel="name"
        placeholder="Select a Mount Type"
        class="w-full"
      />
    </div>
  </div>
  <div class="flex flex-col gap-2 my-6">
    <label>回收人員</label>
    <MultiSelect
      display="chip"
      :options="memberOptions"
      optionLabel="name"
      placeholder="Select Members"
      class="w-full"
      :showToggleAll="false"
    />
    <div class="flex flex-col gap-2 my-6">
      <label>備註</label>
      <Textarea rows="5" />
    </div>
    <div class="flex flex-col gap-2 my-6">
      <label>有效紀錄</label>
      <ToggleSwitch :default-value="true" />
    </div>
  </div>
  <div class="flex flex-row-reverse">
    <Button icon="pi pi-plus" label="新增" />
  </div>
</template>
<script setup lang="ts">
import { useMembers } from '@/composables/members/useMembers'
import { useCameras } from '@/composables/options/useCameras'
import { useMountTypes } from '@/composables/options/useMountTypes'
import { convertMembersToSelectedOptions } from '@/types/member'
import { convertOptionsToSelectedOptions, type SelectedOption } from '@/types/options'
import { onMounted, ref } from 'vue'

const props = defineProps<{ perchMountId: string }>()
const perchMountId = ref<string>(props.perchMountId as string)
const cemeraOptions = ref<Array<SelectedOption>>([])
const mountTypeOptions = ref<Array<SelectedOption>>([])
const memberOptions = ref<Array<SelectedOption>>([])

const {
  data: mountTypes,
  isLoading: isMountTypesLoading,
  error: mountTypesError,
  fetch: fetchMountTypes,
} = useMountTypes()

const {
  data: cameras,
  isLoading: isCamerasLoading,
  error: camerasError,
  fetch: fetchCameras,
} = useCameras()

const {
  data: members,
  isLoading: isMembersLoading,
  error: memberError,
  fetch: fetchMembers,
} = useMembers()

onMounted(async () => {
  await fetchMountTypes()
  await fetchCameras()
  await fetchMembers()
  mountTypeOptions.value = convertOptionsToSelectedOptions(mountTypes.value)
  cemeraOptions.value = convertOptionsToSelectedOptions(cameras.value)
  memberOptions.value = convertMembersToSelectedOptions(members.value)
})
</script>
