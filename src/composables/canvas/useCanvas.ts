import { ref, watch } from 'vue'
import type { CanvasBox, Position, CanvasStyle, Canvas } from '@/types/boundingBox'
import type { BoundingBox } from '@/types/individuals'
import { roundToDecimalPlaces } from '@/utils/boundingBox'

export function useCanvas() {
  const insertingBox = ref<CanvasBox>({
    visible: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    dragingX: 0,
    dragingY: 0,
    style: {
      left: '0px',
      top: '0px',
      width: '0px',
      height: '0px',
    },
  })
  const mousePosition = ref<Position>({
    x: 0,
    y: 0,
  })
  const canvas = ref<Canvas>({
    height: 0,
    width: 0,
    style: { height: '0px', width: '0px' },
  })
  const isDraging = ref<boolean>(false)
  const error = ref<Error | null>(null)

  watch(
    () => [
      insertingBox.value.startX,
      insertingBox.value.startY,
      insertingBox.value.dragingX,
      insertingBox.value.dragingY,
    ],
    (
      [startX, startY, dragingX, dragingY],
      [prevStartX, prevStartY, prevDragingX, prevDragingY],
    ) => {
      if (!isDraging.value) return

      insertingBox.value.style.left = `${Math.min(startX, dragingX)}px`
      insertingBox.value.style.top = `${Math.min(startY, dragingY)}px`
      insertingBox.value.style.width = `${Math.abs(startX - dragingX)}px`
      insertingBox.value.style.height = `${Math.abs(startY - dragingY)}px`
    },
  )

  watch(
    () => [canvas.value.height, canvas.value.width],
    ([height, width], [prevHeight, prevWidth]) => {
      canvas.value.style.height = `${height}px`
      canvas.value.style.width = `${width}px`
    },
  )

  const initCanvas = (offsetWidth: number, offsetHeight: number) => {
    canvas.value.height = offsetHeight
    canvas.value.width = offsetWidth
  }

  const updateMousePosition = (offsetX: number, offsetY: number) => {
    mousePosition.value.x = offsetX
    mousePosition.value.y = offsetY
  }

  const drag = (offsetX: number, offsetY: number) => {
    insertingBox.value.dragingX = offsetX
    insertingBox.value.dragingY = offsetY
  }

  const dragStop = (offsetX: number, offsetY: number) => {
    isDraging.value = false
    insertingBox.value.visible = false
    insertingBox.value.endX = offsetX
    insertingBox.value.endY = offsetY
  }

  const dragStart = (offsetX: number, offsetY: number) => {
    insertingBox.value.visible = true
    isDraging.value = true
    insertingBox.value.startX = offsetX
    insertingBox.value.startY = offsetY
    insertingBox.value.dragingX = offsetX
    insertingBox.value.dragingY = offsetY
  }

  const getNewBox = (): BoundingBox => {
    const { startX, startY, endX, endY } = insertingBox.value
    const { height, width } = canvas.value
    const xMin = Math.min(startX, endX)
    const xMax = Math.max(startX, endX)
    const yMin = Math.min(startY, endY)
    const yMax = Math.max(startY, endY)
    return {
      box_xmin: roundToDecimalPlaces(xMin / width),
      box_xmax: roundToDecimalPlaces(xMax / width),
      box_ymin: roundToDecimalPlaces(yMin / height),
      box_ymax: roundToDecimalPlaces(yMax / height),
    }
  }

  return {
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
  }
}
