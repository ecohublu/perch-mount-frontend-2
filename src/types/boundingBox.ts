export type BasicBoxStyle = {
  height: string
  width: string
}

export type BasicBox = {
  width: number
  height: number
  style: BasicBoxStyle
}

export type BoxStyle = {
  left: string
  top: string
  width: string
  height: string
}

export type IndividualBoxStyle = BoxStyle & {
  borderColorClass: string
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

export type Canvas = BasicBox

export type Position = {
  x: number
  y: number
}

export type PositionIndicator = BasicBox

export type IndividualBox = BasicBox & {
  left: number
  right: number
}
