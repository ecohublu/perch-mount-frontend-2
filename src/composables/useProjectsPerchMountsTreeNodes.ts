import { ref } from 'vue'
import { getPerchMounts } from '@/services/perchAI/perchMounts'
import { getProjects } from '@/services/perchAI/projects'
import type { TreeNode } from 'primevue/treenode'
import type { Project } from '@/types/project'
import type { PerchMount } from '@/types/perchMount'
import type { ExtendTreeNodeData } from '@/types/treenode'

export function useTreeNodes() {
  const treeNodes = ref<TreeNode[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const fetch = async () => {
    isLoading.value = true
    error.value = null
    try {
      const projects = await getProjects()
      const perchMounts = await getPerchMounts()
      treeNodes.value = convertProjectsPerchMountsToTreeNodes(projects, perchMounts)
    } catch (err) {
      error.value = err as Error
      treeNodes.value = []
    } finally {
      isLoading.value = false
    }
  }
  return {
    treeNodes,
    isLoading,
    error,
    fetch,
  }
}
export const convertProjectsPerchMountsToTreeNodes = (
  projects: Project[],
  perchMounts: PerchMount[],
): TreeNode[] => {
  return projects.map((project) => {
    const children: TreeNode[] = perchMounts
      .filter((pm) => pm.project_id === project.id)
      .map((pm) => ({
        key: pm.id,
        label: pm.perch_mount_name,
        data: {
          to: `/admin/perchmounts/${pm.id}`,
          nodeType: 'PerchMount',
          data: pm,
        } satisfies ExtendTreeNodeData,
        icon: 'pi pi-flag-fill',
        leaf: true,
      }))

    return {
      key: project.id,
      label: project.name,
      data: {
        to: `/admin/projects/${project.id}`,
        nodeType: 'Project',
        data: project,
      } satisfies ExtendTreeNodeData,
      icon: 'pi pi-android',
      children,
    }
  })
}
