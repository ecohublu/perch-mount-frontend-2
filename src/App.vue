<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import { setApiErrorHandler } from '@/composables/useApi'

import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { checkLogin } = useAuth()

onMounted(() => {
  // 避免在登入頁執行 checkLogin，造成 redirect loop
  if (route.path !== '/auth/login') {
    checkLogin()
  }
})

setApiErrorHandler((err) => {
  console.error('API Error:', err)
  // 可整合 toast 套件，例如：
  // toast.error((err as Error).message)
})
</script>
