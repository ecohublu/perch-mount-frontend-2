<template>
  <div class="card">
    <div class="grid grid-cols-1 gap-6 items-center">
      <div>
        <span class="text-xl font-bold">{{ perchMount?.perch_mount_name }}</span>
      </div>
      <div>
        <InfoItemCard title="棲架 ID">{{ perchMount?.id }}</InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="棲架名稱">
          <InputText
            class="w-full"
            v-model="editingPerchMount.perch_mount_name"
            @blur="handlePerchMountNameBlur"
          />
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="認領人">
          <Select
            v-model="editingPerchMount.selectedClaimer"
            class="w-full"
            :options="memberOptions"
            optionLabel="name"
            showClear
            @update:model-value="handleClaimerChange"
          />
        </InfoItemCard>
      </div>
      <div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <InfoItemCard title="優先處裡">
              <ToggleButton
                v-model="editingPerchMount.isPriority!"
                class="w-full"
                onLabel="優先處裡中"
                offLabel="無"
                onIcon="pi pi-bookmark-fill"
                offIcon="pi pi-bookmark"
                aria-label="Do you confirm"
                @click="handlePrioritySwitch"
              />
            </InfoItemCard>
          </div>
          <div>
            <InfoItemCard title="撤銷">
              <ToggleButton
                v-model="editingPerchMount.terminated!"
                class="w-full"
                onLabel="已撤銷"
                offLabel="運作中"
                onIcon="pi pi-flag"
                offIcon="pi pi-flag-fill"
                aria-label="Do you confirm"
                @click="handleTerminatedSwitch"
              />
            </InfoItemCard>
          </div>
        </div>
      </div>

      <div>
        <InfoItemCard title="Note">
          <Textarea
            v-model="editingPerchMount.note"
            class="w-full"
            rows="5"
            @blur="handleNoteBlur"
          />
        </InfoItemCard>
      </div>
      <div>
        <InfoItemCard title="座標">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <InputNumber
                v-model="editingPerchMount.latitude"
                inputId="integeronly"
                :maxFractionDigits="6"
                fluid
              />
            </div>
            <div>
              <InputNumber
                v-model="editingPerchMount.longitude"
                inputId="integeronly"
                :maxFractionDigits="6"
                fluid
              />
            </div>
            <div>
              <a
                :href="
                  parseGoogleMapPointURL(editingPerchMount.latitude!, editingPerchMount.longitude!)
                "
                target="_blank"
              >
                <i class="pi pi-map-marker"></i>
                {{ editingPerchMount.latitude! }}, {{ editingPerchMount.longitude! }}
              </a>
              <p class="text-xs opacity-50">建議你先確認看看有沒有打對</p>
            </div>
            <div>
              <Button label="確認變更座標" size="small" @click="handleLocationClick"></Button>
            </div>
          </div>
        </InfoItemCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePerchMountByID } from '@/composables/perchmounts/usePerchMount'
import { onMounted, ref, watch, type Ref } from 'vue'
import { useMembers } from '@/composables/members/useMembers'
import { convertMembersToSelectedOptions } from '@/types/member'
import { parseGoogleMapPointURL } from '@/utils/googleMap'
import type { SelectedOption } from '@/types/options'
import InfoItemCard from '@/components/cards/InfoItemCard.vue'
import { usePerchMountEdit } from '@/composables/perchmounts/usePerchMountEdit'
import { useToast } from 'primevue'

const toast = useToast()

const props = defineProps<{ id: string }>()

const memberOptions = ref<Array<SelectedOption>>([])
const {
  data: perchMount,
  isLoading: isPerchMountsLoading,
  error: perchMountError,
  fetch: fetchPerchMount,
} = usePerchMountByID(props.id)

const {
  data: members,
  isLoading: isMembersLoading,
  error: memberError,
  fetch: fetchMembers,
} = useMembers()

const {
  error: updateError,
  isUpdating,
  editingPerchMount,
  initEditingPerchMount,
  updateByID,
} = usePerchMountEdit(toast)

onMounted(async () => {
  await fetchPerchMount()
  await fetchMembers()
  memberOptions.value = convertMembersToSelectedOptions(members.value)
  initEditingPerchMount(perchMount.value!)
})

const handlePerchMountNameBlur = async () => {
  await updateByID(perchMount.value?.id!, {
    perch_mount_name: editingPerchMount.value.perch_mount_name!,
  })
  fetchPerchMount()
}
const handleClaimerChange = async () => {
  const selectedClaimer = editingPerchMount.value.selectedClaimer
  await updateByID(perchMount.value?.id!, {
    claim_by_id: selectedClaimer ? selectedClaimer.code : null,
  })
  fetchPerchMount()
}
const handlePrioritySwitch = async () => {
  await updateByID(perchMount.value?.id!, {
    is_priority: editingPerchMount.value.isPriority!,
  })
  fetchPerchMount()
}
const handleTerminatedSwitch = async () => {
  await updateByID(perchMount.value?.id!, {
    terminated: editingPerchMount.value.terminated!,
  })
  fetchPerchMount()
}
const handleNoteBlur = async () => {
  await updateByID(perchMount.value?.id!, {
    note: editingPerchMount.value.note! ? editingPerchMount.value.note! : null,
  })
  fetchPerchMount()
}
const handleLocationClick = async () => {
  await updateByID(perchMount.value?.id!, {
    latitude: editingPerchMount.value.latitude!,
    longitude: editingPerchMount.value.longitude!,
  })
  fetchPerchMount()
}
</script>
