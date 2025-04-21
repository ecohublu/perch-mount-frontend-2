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
  style: BoxStyle
}

export type CanvasStyle = {
  height: string
  width: string
}

export type Position = {
  x: number
  y: number
}
