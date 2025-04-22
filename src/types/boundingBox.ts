export type BoxStyle = {
  left: string
  top: string
  width: string
  height: string
}

export type CanvasBox = {
  visible: boolean
  startX: number
  startY: number
  endX: number
  endY: number
  dragingX: number
  dragingY: number
  style: BoxStyle
}

export type Canvas = {
  width: number
  height: number
  style: CanvasStyle
}

export type CanvasStyle = {
  height: string
  width: string
}

export type Position = {
  x: number
  y: number
}
