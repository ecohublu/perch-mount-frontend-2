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
  year?: number
  month?: number
}>()

const getRouterTo = (): string => {
  let to: string = ''
  if (props.sectionID) {
    to = `/app/${props.operation}?section_ids=${props.sectionID}`
  } else if (props.perchMountID) {
    to = `/app/${props.operation}?perch_mount_ids=${props.perchMountID}`
  }
  if (props.year) {
    to = `${to}&year=${props.year}`
  }
  if (props.month) {
    to = `${to}&month=${props.month}`
  }
  return to
}
</script>
