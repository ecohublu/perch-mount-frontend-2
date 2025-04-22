<template>
  <div class="relative">
    <div
      class="absolute cursor-crosshair z-5"
      :style="canvas.style"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
    ></div>
    <InsertingBox :visible="insertingBox.visible" :style="insertingBox.style"></InsertingBox>
    <IndicatorLine type="horizontal" :style="horizontal.style"></IndicatorLine>
    <IndicatorLine type="vertical" :style="vertical.style"></IndicatorLine>
    <IndividualBox
      v-for="individual in reviewingMedium.individuals"
      :visible="!individual.deleted"
      :individual="individual"
      :canvas-height="canvas.height"
      :canvas-width="canvas.width"
    ></IndividualBox>
    <IndividualBox
      v-for="individual in reviewingMedium.ai_missed_individuals"
      :visible="!individual.deleted"
      :individual="individual"
      :canvas-height="canvas.height"
      :canvas-width="canvas.width"
    ></IndividualBox>
    <img
      ref="image"
      :src="convertIDToS3Link(reviewingMedium.id, true)"
      alt="Image"
      draggable="false"
    />
  </div>
  <p>
    x: {{ (mousePosition.x / image?.offsetWidth!).toFixed(4) }} y:
    {{ (mousePosition.y / image?.offsetHeight!).toFixed(4) }}
  </p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ReviewingMedium } from '@/types/media'
import type { BoundingBox } from '@/types/individuals'
import { convertIDToS3Link } from '@/composables/media/s3'
import { useCanvas, usePostionIndicator } from '@/composables/canvas/useCanvas'

import IndicatorLine from '@/components/BoxCanvas/IndicatorLine.vue'
import InsertingBox from '@/components/BoxCanvas/InsertingBox.vue'
import IndividualBox from '@/components/BoxCanvas/IndividualBox.vue'

const props = defineProps<{
  reviewingMedium: ReviewingMedium
}>()

const image = ref<HTMLElement | null>(null)

const {
  insertingBox,
  mousePosition,
  canvas,
  isDraging,
  error,
  initCanvas,
  updateMousePosition,
  drag,
  dragStop,
  dragStart,
  getNewBox,
} = useCanvas()

const { horizontal, vertical, initIndicators, moving } = usePostionIndicator()

const emit = defineEmits<{
  (e: 'box-created', value: BoundingBox): void
}>()

onMounted(() => {
  if (image.value) {
    const { offsetWidth, offsetHeight } = image.value
    initCanvas(offsetWidth, offsetHeight)
    initIndicators(offsetWidth, offsetHeight)
  }
})

const handleMouseMove = (event: any) => {
  updateMousePosition(event.offsetX, event.offsetY)
  moving(event.offsetX, event.offsetY)
  if (isDraging) {
    drag(event.offsetX, event.offsetY)
  }
}
const handleMouseUp = (event: any) => {
  dragStop(event.offsetX, event.offsetY)
  emit('box-created', getNewBox())
}
const handleMouseDown = (event: any) => {
  dragStart(event.offsetX, event.offsetY)
}
</script>
