<template>
  <SectionView :id="id"></SectionView>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SectionView from '@/components/adminviews/SectionView.vue'
const route = useRoute()
const id = ref<string>(route.params.id as string)
</script>
