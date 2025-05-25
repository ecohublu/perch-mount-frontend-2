<template>
  <PerchMountView class="my-6" :id="perchMountID"></PerchMountView>
  <SectionsTableOfPerchMount class="my-6" :id="perchMountID"></SectionsTableOfPerchMount>
  <PerchMountMonthlyCounts class="my-6" :id="perchMountID"></PerchMountMonthlyCounts>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PerchMountView from '@/components/views/PerchMountView.vue'
import SectionsTableOfPerchMount from '@/components/SectionsTableOfPerchMount.vue'
import PerchMountMonthlyCounts from '@/components/PerchMountMonthlyCounts.vue'

const route = useRoute()
const perchMountID = ref<string>(route.params.id as string)
</script>
