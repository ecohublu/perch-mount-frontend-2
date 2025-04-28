<template>
  <div v-if="props.value && (sectionID || perchMountID)">
    <router-link :to="getRouterTo()">
      <Tag :value="value" severity="warn" rounded />
    </router-link>
  </div>
  <div v-else>
    {{ value }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  value: number
  operation: 'emptycheck' | 'review'
  sectionID?: string
  perchMountID?: string
}>()

const getRouterTo = (): string => {
  if (props.sectionID) {
    return `/app/${props.operation}?section_ids=${props.sectionID}`
  } else if (props.perchMountID) {
    return `/app/${props.operation}?perch_mount_ids=${props.perchMountID}`
  }
  return ''
}
</script>
