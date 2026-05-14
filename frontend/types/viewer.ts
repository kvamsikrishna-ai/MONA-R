export type ViewerMode =

  | "split"

  | "overlay"

  | "original"

  | "heatmap"

export interface ViewerState {

  mode: ViewerMode

  overlayOpacity: number

  syncZoom: boolean

  syncPan: boolean
}