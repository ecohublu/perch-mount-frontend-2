<template>
  <div>
    <Loading v-if="useTreeNodesLoading"></Loading>

    <Tree v-else :value="treeNodes" :filter="true" filterMode="lenient" class="w-full md:w-[30rem]">
      <template #default="slotProps">
        <router-link :to="slotProps.node.data.to">{{ slotProps.node.label }}</router-link>
      </template>
    </Tree>

    <Button label="新增計畫" icon="pi pi-plus" class="mt-6" @click="addProjectVisiable = true" />
    <Dialog
      v-model:visible="addProjectVisiable"
      modal
      header="新增計畫"
      :style="{ width: '25rem' }"
    >
      <AddProjectForm @added="handleProjectAdded"></AddProjectForm>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { useTreeNodes } from '@/composables/useProjectsPerchMountsTreeNodes'
import { onMounted, ref } from 'vue'
import Loading from '@/components/Loading.vue'
import { useProjects } from '@/composables/projects/useProjects'

const addProjectVisiable = ref<boolean>(false)

const {
  treeNodes,
  isLoading: useTreeNodesLoading,
  error: treeNodesError,
  fetch: fetchTreeNodes,
} = useTreeNodes()
onMounted(fetchTreeNodes)

const {
  data: projects,
  isLoading: usProjectsLoading,
  error: projectsError,
  fetch: fetchProjects,
} = useProjects()
onMounted(fetch)

const handleProjectAdded = () => {
  fetchProjects()
}
</script>
