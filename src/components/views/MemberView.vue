<template>
  <div class="card">
    {{ member }}
  </div>
</template>
<script setup lang="ts">
import { useMemberByID } from '@/composables/members/useMemberByID'
import { onMounted } from 'vue'

const props = defineProps<{ id: string }>()

const {
  data: member,
  isLoading: isMemberLoading,
  error: memberError,
  fetch: fetchMember,
} = useMemberByID(props.id)

onMounted(async () => {
  await fetchMember()
  console.log(member.value)
})
</script>
