<template>
  <div class="card">
    {{ member }}
  </div>
</template>
<script setup lang="ts">
import { useMember } from '@/composables/members/useMemberByID'
import { onMounted } from 'vue'

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
