<template>
  <div v-if="auth.currentUser?.is_admin">
    <slot></slot>
  </div>
  <div v-else>
    <img
      src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/refs/heads/main/ResponseCode/403%20Forbidden.png"
      alt="403 Forbidden"
    />
  </div>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const props = defineProps<{ level: 'admin' | 'super' }>()

const auth = useAuth()
</script>
