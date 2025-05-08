<template>
  <div class="card">
    <MemberView :id="id"></MemberView>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import MemberView from '@/components/views/MemberView.vue'
import { ref } from 'vue'
import type { Member } from '@/types/member'

const auth = useAuth()
const id = ref<string>(auth.currentUser?.id!)
</script>
