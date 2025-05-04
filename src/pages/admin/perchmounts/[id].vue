<template>
  <PerchmountView :id="id!"></PerchmountView>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import PerchmountView from '@/components/adminviews/PerchmountView.vue'
import { ref } from 'vue'

const route = useRoute()
const id = ref<string | null>(route.params.id as string)
</script>
