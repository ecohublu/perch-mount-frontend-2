<template>
  <Button
    type="button"
    icon="pi pi-chevron-down"
    variant="text"
    severity="secondary"
    @click="toggle"
    size="small"
    rounded
  />
  <Popover ref="op" class="shadow-xl">
    <div class="grid grid-cols-2 gap-4 max-w-3xs">
      <div class="font-bold">發報器：</div>
      <div>
        <Checkbox v-model="localIsTagged" binary></Checkbox>
      </div>
      <div class="font-bold">腳環：</div>
      <div>
        <Checkbox v-model="localHasRing" binary></Checkbox>
      </div>
      <div class="font-bold">環號：</div>
      <div>
        <InputText type="text" v-model="localRingNumber" size="small" class="max-w-24" />
      </div>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const op = ref()

const props = defineProps<{
  is_tagged: boolean
  has_ring: boolean
  ring_number: string | null
}>()

const localIsTagged = computed({
  get: () => props.is_tagged,
  set: (val: boolean) => emit('update:is_tagged', val),
})

const localHasRing = computed({
  get: () => props.has_ring,
  set: (val: boolean) => emit('update:has_ring', val),
})

const localRingNumber = computed({
  get: () => props.ring_number,
  set: (val: string) => emit('update:ring_number', val),
})

const emit = defineEmits<{
  (e: 'update:is_tagged', value: boolean): void
  (e: 'update:has_ring', value: boolean): void
  (e: 'update:ring_number', value: string): void
}>()

const toggle = (event: any) => {
  op.value.toggle(event)
}
</script>
