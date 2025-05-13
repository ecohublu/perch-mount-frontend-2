<template>
  <AdminContent level="admin">
    <div class="flex justify-center">
      <AdminView></AdminView>
    </div>
  </AdminContent>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import AdminContent from '@/components/adminviews/AdminContent.vue'
import AdminView from '@/components/adminviews/AdminView.vue'

const auth = useAuth()
</script>
