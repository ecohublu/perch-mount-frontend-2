<template>
  <Loading v-if="isLoading"></Loading>
  <Tree v-else :value="treeNodes" :filter="true" filterMode="lenient" class="w-full md:w-[30rem]">
    <template #default="slotProps">
      <router-link :to="slotProps.node.data.to">{{ slotProps.node.label }}</router-link>
    </template>
  </Tree>
</template>
<script setup lang="ts">
import { useTreeNodes } from '@/composables/useProjectsPerchMountsTreeNodes'
import { onMounted } from 'vue'

import Loading from '@/components/Loading.vue'

const { treeNodes, isLoading, error, fetch } = useTreeNodes()
onMounted(fetch)
</script>
