<template>
  <div class="flex items-center py-2">
    <Avatar :image="member.profile_picture_url" shape="circle" />
    <div class="ms-2">
      <p>{{ member.display_name }}</p>
      <p class="text-surface-500 dark:text-surface-400 text-xd">{{ member.gmail }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Member } from '@/types/member'

const props = defineProps<{
  member: Member
}>()
</script>
