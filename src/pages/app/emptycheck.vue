<template>
  <EmptyCheckView :query="query"></EmptyCheckView>
</template>
<script setup lang="ts">
import EmptyCheckView from '@/components/views/EmptyCheckView.vue'
import { useMediaOperationQuery } from '@/utils/urlParse'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = useMediaOperationQuery(route)
</script>
