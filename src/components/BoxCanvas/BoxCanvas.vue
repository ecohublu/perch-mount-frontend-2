<template>
  <div class="relative">
    <div
      class="absolute cursor-crosshair z-5"
      :style="canvasStyle"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
    ></div>
    <div
      v-show="insertingBox.visible"
      class="absolute border-round border-3 border-white-alpha-50"
      :style="insertingBox.style"
    ></div>
    <img ref="image" :src="convertIDToS3Link(medium.id, true)" alt="Image" draggable="false" />
    <p>
      x: {{ (mousePosition.x / image?.offsetWidth!).toFixed(4) }} y:
      {{ (mousePosition.y / image?.offsetHeight!).toFixed(4) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Medium, ReviewingMedium } from '@/types/media'
import { convertIDToS3Link } from '@/composables/media/s3'
import { useCanvas } from '@/composables/canvas/useCanvas'

const props = defineProps<{
  medium: Medium
  reviewingMedium: ReviewingMedium
}>()

const image = ref<HTMLElement | null>(null)

const {
  insertingBox,
  mousePosition,
  canvasStyle,
  isMouseDown,
  error,
  initCanvas,
  updateMousePosition,
  drag,
  MouseUp,
  MouseDown,
} = useCanvas()

onMounted(() => {
  if (image.value) {
    initCanvas(image.value.offsetWidth, image.value.offsetHeight)
  }
})

const handleMouseMove = (event: any) => {
  updateMousePosition(event.offsetX, event.offsetY)
  if (isMouseDown) {
    drag(event.offsetX, event.offsetY)
  }
}
const handleMouseUp = () => {
  MouseUp()
}
const handleMouseDown = (event: any) => {
  MouseDown(event.offsetX, event.offsetY)
}
</script>
