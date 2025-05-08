<template>
  <div v-if="auth.currentUser?.is_admin || auth.currentUser?.is_super_admin">
    <div class="flex justify-center">
      <AdminView></AdminView>
    </div>
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
import AdminView from '@/components/adminviews/AdminView.vue'
const auth = useAuth()
</script>
