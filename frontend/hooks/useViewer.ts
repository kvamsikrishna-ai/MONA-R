"use client"

import { useState }
  from "react"

import {
  ViewerMode,
} from "@/types/viewer"

export function useViewer() {

  const [mode, setMode] =

    useState<ViewerMode>(
      "split"
    )

  const [overlayOpacity,
    setOverlayOpacity] =

    useState(0.5)

  const [syncZoom,
    setSyncZoom] =

    useState(true)

  const [syncPan,
    setSyncPan] =

    useState(true)

  return {

    mode,

    setMode,

    overlayOpacity,

    setOverlayOpacity,

    syncZoom,

    setSyncZoom,

    syncPan,

    setSyncPan,
  }
}