<template>
  <Splitter class="mb-8">
    <SplitterPanel class="flex items-center justify-center p-8" :size="35">
      <div class="card overscroll-auto">
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
                variant="filled"
                :default-value="perchMount?.perch_mount_name"
              />
            </InfoItemCard>
          </div>
          <div>
            <div class="grid grid-cols-4">
              <div class="col-span-3">
                <InfoItemCard title="認領人">
                  <Select :options="memberOptions" optionLabel="name" class="w-full" />
                </InfoItemCard>
              </div>
              <div class="col-span-1">
                <InfoItemCard title="">
                  <Button label="清除認領" size="small"></Button>
                </InfoItemCard>
              </div>
            </div>
          </div>
          <div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <InfoItemCard title="優先處裡">
                  <ToggleButton
                    onLabel="優先處裡中"
                    offLabel="無"
                    onIcon="pi pi-bookmark-fill"
                    offIcon="pi pi-bookmark"
                    aria-label="Do you confirm"
                  />
                </InfoItemCard>
              </div>
              <div>
                <InfoItemCard title="撤銷">
                  <ToggleButton
                    onLabel="已撤銷"
                    offLabel="運作中"
                    onIcon="pi pi-flag"
                    offIcon="pi pi-flag-fill"
                    aria-label="Do you confirm"
                  />
                </InfoItemCard>
              </div>
            </div>
          </div>

          <div>
            <InfoItemCard title="Note">
              <Textarea class="w-full" rows="5" />
            </InfoItemCard>
          </div>
          <div>
            <InfoItemCard title="座標">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <InputNumber
                    v-model="location[0]"
                    inputId="integeronly"
                    :maxFractionDigits="6"
                    fluid
                  />
                </div>
                <div>
                  <InputNumber
                    v-model="location[1]"
                    inputId="integeronly"
                    :maxFractionDigits="6"
                    fluid
                    @blur="handleBlur"
                  />
                </div>
                <div>
                  <a :href="parseGoogleMapPointURL(location[0], location[1])" target="_blank">
                    <i class="pi pi-map-marker"></i>
                    {{ location[0] }}, {{ location[1] }}
                  </a>
                  <p class="text-xs opacity-50">建議你先確認看看有沒有打對</p>
                </div>
                <div>
                  <Button label="確認變更座標" size="small"></Button>
                </div>
              </div>
            </InfoItemCard>
          </div>
        </div>
      </div>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center p-8" :size="65"> Panel 2 </SplitterPanel>
  </Splitter>
</template>
<script setup lang="ts">
import { usePerchMountByID } from '@/composables/perchmounts/usePerchMount'
import { onMounted, ref } from 'vue'
import { useMembers } from '@/composables/members/useMembers'
import { convertMembersToSelectedOptions } from '@/types/member'
import { parseGoogleMapPointURL } from '@/utils/googleMap'
import type { SelectedOption } from '@/types/options'
import InfoItemCard from '@/components/cards/InfoItemCard.vue'

const props = defineProps<{ id: string }>()

const location = ref<Array<number>>([0, 0])

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

onMounted(async () => {
  await fetchPerchMount()
  await fetchMembers()
  memberOptions.value = convertMembersToSelectedOptions(members.value)
  location.value = [perchMount.value?.latitude!, perchMount.value?.longitude!]
})

const handleBlur = () => {
  console.log(location.value)
}
</script>
