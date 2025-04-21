import { ref } from 'vue'
import type { CanvasBox, Position, CanvasStyle } from '@/types/boundingBox'

export function useCanvas() {
  const insertingBox = ref<CanvasBox>({
    visible: false,
    startX: 0,
    startY: 0,
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
  const canvasStyle = ref<CanvasStyle>({ height: '0px', width: '0px' })
  const isMouseDown = ref<boolean>(false)
  const error = ref<Error | null>(null)

  const initCanvas = (offsetWidth: number, offsetHeight: number) => {
    canvasStyle.value.width = `${offsetWidth}px`
    canvasStyle.value.height = `${offsetHeight}px`
  }

  const updateMousePosition = (offsetX: number, offsetY: number) => {
    mousePosition.value.x = offsetX
    mousePosition.value.y = offsetY
  }

  const drag = (offsetX: number, offsetY: number) => {
    insertingBox.value.style.left = `${Math.min(insertingBox.value.startX, offsetX)}px`
    insertingBox.value.style.top = `${Math.min(insertingBox.value.startY, offsetY)}px`
    insertingBox.value.style.width = `${Math.abs(insertingBox.value.startX - offsetX)}px`
    insertingBox.value.style.height = `${Math.abs(insertingBox.value.startY - offsetY)}px`
  }

  const MouseUp = () => {
    isMouseDown.value = false
    insertingBox.value.visible = false
  }

  const MouseDown = (offsetX: number, offsetY: number) => {
    insertingBox.value.visible = true
    isMouseDown.value = true
    insertingBox.value.startX = offsetX
    insertingBox.value.startY = offsetY
    insertingBox.value.style.width = '0px'
    insertingBox.value.style.height = '0px'
  }

  return {
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
  }
}
