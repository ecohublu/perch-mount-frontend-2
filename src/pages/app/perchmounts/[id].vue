<template>
  <PerchMountView class="mb-6" :id="perchMountID"></PerchMountView>
  <SectionsTableOfPerchMount class="mb-6" :id="perchMountID"></SectionsTableOfPerchMount>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PerchMountView from '@/components/views/PerchMountView.vue'
import SectionsTableOfPerchMount from '@/components/SectionsTableOfPerchMount.vue'

const route = useRoute()
const perchMountID = ref<String>(route.params.id as String)
</script>
