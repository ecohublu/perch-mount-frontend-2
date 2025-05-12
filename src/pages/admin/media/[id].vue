<template>
  <MediumView :id="id"></MediumView>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import MediumView from '@/components/adminviews/MediumView.vue'
import { ref } from 'vue'
const route = useRoute()
const id = ref<string>(route.params.id as string)
</script>
