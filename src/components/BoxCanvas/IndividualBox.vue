<template>
  <div
    v-show="visible"
    class="absolute rounded border-3 z-0"
    :class="borderColorClass"
    :style="box"
  >
    <span class="absolute px-1 rounded-br-lg" :class="getBGColorClassByIndex(index)">{{
      index
    }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useColorLibraryStore } from '@/stores/colorLibrary'
import type { BoxStyle } from '@/types/boundingBox'
import type { AIMissedReviewingIndividual, ReviewingIndividual } from '@/types/individuals'

const { getBorderColorClassByIndex, getBGColorClassByIndex } = useColorLibraryStore()

const props = defineProps<{
  visible: boolean
  index: number
  individual: ReviewingIndividual | AIMissedReviewingIndividual
  canvasWidth: number
  canvasHeight: number
}>()

const box = ref<BoxStyle>({
  left: '0px',
  top: '0px',
  width: '0px',
  height: '0px',
})

const borderColorClass = ref<Record<string, boolean>>({})
borderColorClass.value[getBorderColorClassByIndex(props.index)] = true

const updateBoxStyle = () => {
  const { box_xmin, box_xmax, box_ymin, box_ymax } = props.individual
  const { canvasWidth, canvasHeight } = props

  if (box_xmin !== null && box_xmax !== null && box_ymin !== null && box_ymax !== null) {
    box.value = {
      left: `${box_xmin * canvasWidth}px`,
      top: `${box_ymin * canvasHeight}px`,
      width: `${(box_xmax - box_xmin) * canvasWidth}px`,
      height: `${(box_ymax - box_ymin) * canvasHeight}px`,
    }
  } else {
    // 清空樣式或設預設值
    box.value = {
      left: '0px',
      top: '0px',
      width: '0px',
      height: '0px',
    }
  }
}

// 初始呼叫一次
updateBoxStyle()

// 監聽 relevant props
watch(() => [props.individual, props.canvasWidth, props.canvasHeight], updateBoxStyle, {
  deep: true,
})
</script>
