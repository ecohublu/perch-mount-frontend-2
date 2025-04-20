<template>
  <ReviewView :query="query"></ReviewView>
</template>
<script setup lang="ts">
import ReviewView from '@/components/views/ReviewView.vue'
import { useMediaOperationQuery } from '@/utils/urlParse'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = useMediaOperationQuery(route)
</script>
