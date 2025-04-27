<template>
  <RouterView />

  <!-- This is a dumb workaround for let vue get the tailwind style-->
  <div v-show="false">
    <div class="bg-primary-500 border-primary-500"></div>
    <div class="bg-red-500 border-red-500"></div>
    <div class="bg-amber-500 border-amber-500"></div>
    <div class="bg-lime-500 border-lime-500"></div>
    <div class="bg-emerald-500 border-emerald-500"></div>
    <div class="bg-cyan-500 border-cyan-500"></div>
    <div class="bg-blue-500 border-blue-500"></div>
    <div class="bg-violet-500 border-violet-500"></div>
    <div class="bg-fuchsia-500 border-fuchsia-500"></div>
    <div class="bg-rose-500 border-rose-500"></div>
    <div class="bg-primary-800 border-primary-800"></div>
    <div class="bg-red-800 border-red-800"></div>
    <div class="bg-amber-800 border-amber-800"></div>
    <div class="bg-lime-800 border-lime-800"></div>
    <div class="bg-emerald-800 border-emerald-800"></div>
    <div class="bg-cyan-800 border-cyan-800"></div>
    <div class="bg-blue-800 border-blue-800"></div>
    <div class="bg-violet-800 border-violet-800"></div>
    <div class="bg-fuchsia-800 border-fuchsia-800"></div>
    <div class="bg-rose-800 border-rose-800"></div>
    <div class="bg-primary-300 border-primary-300"></div>
    <div class="bg-red-300 border-red-300"></div>
    <div class="bg-amber-300 border-amber-300"></div>
    <div class="bg-lime-300 border-lime-300"></div>
    <div class="bg-emerald-300 border-emerald-300"></div>
    <div class="bg-cyan-300 border-cyan-300"></div>
    <div class="bg-blue-300 border-blue-300"></div>
    <div class="bg-violet-300 border-violet-300"></div>
    <div class="bg-fuchsia-300 border-fuchsia-300"></div>
    <div class="bg-rose-300 border-rose-300"></div>
    <div class="border-red-500"></div>
  </div>
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
