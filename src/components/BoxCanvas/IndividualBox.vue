<template>
  <div
    v-show="visible"
    class="absolute border-round border-3 border-primary-500 z-0"
    :style="box"
  ></div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { BoxStyle } from '@/types/boundingBox'
import type {
  AIMissedReviewingIndividual,
  ReviewingIndividual,
  UnreviewedIndividualsContents,
} from '@/types/individuals'

const box = ref<BoxStyle>({
  left: '0px',
  top: '0px',
  width: '0px',
  height: '0px',
})

const props = defineProps<{
  visible: boolean
  individual: ReviewingIndividual | AIMissedReviewingIndividual
  canvasWidth: number
  canvasHeight: number
}>()

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
