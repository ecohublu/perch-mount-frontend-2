<template>
  <main>
    <SideBar></SideBar>
    <div class="mt-8 mx-6">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
import SideBar from '@/components/dashboard/SideBar.vue'
</script>
