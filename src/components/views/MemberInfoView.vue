<template>
  <div class="card">
    <Panel toggleable>
      <template #header>
        <div class="flex items-center">
          <Avatar :image="member?.profile_picture_url" class="mr-4" size="large" shape="circle" />
          <CardHeader>{{ member?.display_name }}</CardHeader>
        </div>
      </template>
      <div class="grid grid-cols-1 gap-6">
        <div class="flex flex-wrap gap-2">
          <Tag v-if="member?.blocked" severity="danger" value="Blocked"></Tag>
          <Tag v-if="!member?.activated" severity="warn" value="inactive"></Tag>
        </div>
        <div>
          <InfoItemCard title="ID">
            {{ member?.id }}
          </InfoItemCard>
        </div>
        <div>
          <InfoItemCard title="Email">
            {{ member?.gmail }}
          </InfoItemCard>
        </div>
        <div>
          <InfoItemCard title="Last Name">
            {{ member?.last_name }}
          </InfoItemCard>
        </div>
        <div>
          <InfoItemCard title="First Name">
            {{ member?.first_name }}
          </InfoItemCard>
        </div>
        <div>
          <InfoItemCard title="Position">
            {{ member?.position }}
          </InfoItemCard>
        </div>
        <div>
          <InfoItemCard title="Admin">
            {{ member?.is_admin }}
          </InfoItemCard>
        </div>
        <div>
          <InfoItemCard title="Super Admin">
            {{ member?.is_super_admin }}
          </InfoItemCard>
        </div>
      </div>
    </Panel>
  </div>
</template>
<script setup lang="ts">
import { useMember } from '@/composables/members/useMemberByID'
import { onMounted } from 'vue'
import InfoItemCard from '../cards/InfoItemCard.vue'

const props = defineProps<{ id: string }>()

const {
  data: member,
  isLoading: isMemberLoading,
  error: memberError,
  fetch: fetchMember,
} = useMember()

onMounted(async () => {
  await fetchMember(props.id)
})
</script>
