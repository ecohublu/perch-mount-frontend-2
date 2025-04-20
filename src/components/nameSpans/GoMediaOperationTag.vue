<template>
  <Tag severity="info">
    <router-link :to="getRouterTo()">
      <slot />
    </router-link>
  </Tag>
</template>
<script setup lang="ts">
const props = defineProps<{
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
