<template>
  <ProjectView :id="projectID"></ProjectView>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

import ProjectView from '@/components/views/ProjectView.vue'
import { computed, ref } from 'vue'

const route = useRoute()
const projectID = ref<string>(route.params.id as string)
</script>
