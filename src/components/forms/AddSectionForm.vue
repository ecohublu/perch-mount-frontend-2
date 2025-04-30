<template>
  <div v-if="submitError">
    <Message severity="error">{{ submitError }}</Message>
  </div>
  <div v-if="submitting">submitting</div>
  <div v-else-if="addedSection">
    <Message severity="success">
      上傳成功！去新的
      <Tag severity="success">
        <SectionSpan :id="addedSection.id" name="Section"></SectionSpan>
      </Tag>
      看看
    </Message>
  </div>
  <div v-else>
    <div class="flex flex-col gap-2 my-6">
      <label>棲架 ID *</label>
      <InputText
        v-model="addingSection.perch_mount_id"
        :invalid="!addingSection.perch_mount_id"
        disabled
      />
    </div>
    <div class="grid grid-cols-2 gap-4 my-6">
      <div class="flex flex-col gap-2">
        <label>相機 *</label>
        <Select
          v-model="addingSection.selectedCamera"
          :options="cemeraOptions"
          :invalid="!addingSection.selectedCamera"
          optionLabel="name"
          placeholder="選擇一個相機"
          class="w-full"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label>支架類型 *</label>
        <Select
          v-model="addingSection.selectedMountType"
          :invalid="!addingSection.selectedMountType"
          :options="mountTypeOptions"
          optionLabel="name"
          placeholder="選擇一個支架類型"
          class="w-full"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2 my-6">
      <label>回收日期 *</label>
      <DatePicker v-model="addingSection.swapped_date" :invalid="!addingSection.swapped_date" />
    </div>
    <div class="flex flex-col gap-2 my-6">
      <label>回收人員 *</label>
      <MultiSelect
        v-model="addingSection.selectedMembers"
        :options="memberOptions"
        :showToggleAll="false"
        :invalid="addingSection.selectedMembers.length === 0"
        display="chip"
        optionLabel="name"
        placeholder="選擇回收人員"
        class="w-full"
      />
      <div class="flex flex-col gap-2 my-6">
        <label>備註</label>
        <Textarea v-model="addingSection.note" rows="3" />
      </div>
      <div class="flex flex-col gap-2 my-6">
        <label>有效紀錄</label>
        <ToggleSwitch v-model="addingSection.valid" :default-value="true" />
      </div>
    </div>
    <div class="flex flex-row-reverse">
      <Button icon="pi pi-plus" label="新增" @click="handleAddClicked" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMembers } from '@/composables/members/useMembers'
import { useCameras } from '@/composables/options/useCameras'
import { useMountTypes } from '@/composables/options/useMountTypes'
import { useAddingSection } from '@/composables/sections/useAddingSection'
import { convertMembersToSelectedOptions } from '@/types/member'
import { convertOptionsToSelectedOptions, type SelectedOption } from '@/types/options'
import { onMounted, ref } from 'vue'

import SectionSpan from '@/components/nameSpans/SectionSpan.vue'

const props = defineProps<{ perchMountId: string }>()

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

const {
  section: addingSection,
  valid,
  validate,
  submitting,
  addedSection,
  submitError,
  submit,
} = useAddingSection()

onMounted(async () => {
  await fetchMountTypes()
  await fetchCameras()
  await fetchMembers()
  mountTypeOptions.value = convertOptionsToSelectedOptions(mountTypes.value)
  cemeraOptions.value = convertOptionsToSelectedOptions(cameras.value)
  memberOptions.value = convertMembersToSelectedOptions(members.value)
  addingSection.value.perch_mount_id = props.perchMountId
})

const handleAddClicked = () => {
  validate()
  if (!valid.value) {
    return
  }
  submit()
}
</script>
