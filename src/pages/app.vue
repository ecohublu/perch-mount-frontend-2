<template>
  <main>
    <SideBar></SideBar>
    <div class="mt-8 mx-6">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '@/components/dashboard/SideBar.vue'

const visible = ref(false)
</script>
