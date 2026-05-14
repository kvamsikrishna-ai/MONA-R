"use client"

import { useState }
  from "react"

import OriginalViewer
  from "./OriginalViewer"

import HeatmapViewer
  from "./HeatmapViewer"

import OverlayViewer
  from "./OverlayViewer"

import { ViewerMode }
  from "@/types/viewer"

import {
  defaultViewport,
  ViewportState,
} from "@/state/viewerState"

interface Props {

  mode: ViewerMode

  originalImage: string

  heatmapImage: string

  overlayOpacity: number

  syncZoom: boolean

  syncPan: boolean
}

export default function
DualViewer({

  mode,

  originalImage,

  heatmapImage,

  overlayOpacity,

  syncZoom,

  syncPan,

}: Props) {

  /* =========================
     VIEWPORT STATES
  ========================== */

  const [leftViewport,
    setLeftViewport] =

    useState<ViewportState>(
      defaultViewport
    )

  const [rightViewport,
    setRightViewport] =

    useState<ViewportState>(
      defaultViewport
    )

  /* =========================
     SYNC HELPERS
  ========================== */

  function updateLeftViewport(
    viewport: ViewportState
  ) {

    setLeftViewport(viewport)

    setRightViewport({

      zoom:
        syncZoom
        ? viewport.zoom
        : rightViewport.zoom,

      offsetX:
        syncPan
        ? viewport.offsetX
        : rightViewport.offsetX,

      offsetY:
        syncPan
        ? viewport.offsetY
        : rightViewport.offsetY,
    })
  }

  function updateRightViewport(
    viewport: ViewportState
  ) {

    setRightViewport(viewport)

    setLeftViewport({

      zoom:
        syncZoom
        ? viewport.zoom
        : leftViewport.zoom,

      offsetX:
        syncPan
        ? viewport.offsetX
        : leftViewport.offsetX,

      offsetY:
        syncPan
        ? viewport.offsetY
        : leftViewport.offsetY,
    })
  }

  /* =========================
     SPLIT MODE
  ========================== */

  if (mode === "split") {

    return (

      <div className="
        grid
        grid-cols-2
        gap-5
      ">

        <OriginalViewer
          image={originalImage}
          viewport={leftViewport}
          setViewport={
            updateLeftViewport
          }
        />

        <HeatmapViewer
          image={heatmapImage}
          viewport={rightViewport}
          setViewport={
            updateRightViewport
          }
        />

      </div>
    )
  }

  /* =========================
     OVERLAY MODE
  ========================== */

  if (mode === "overlay") {

    return (

      <OverlayViewer
        originalImage={originalImage}
        heatmapImage={heatmapImage}
        opacity={overlayOpacity}
      />
    )
  }

  /* =========================
     ORIGINAL ONLY
  ========================== */

  if (mode === "original") {

    return (

      <OriginalViewer
        image={originalImage}
        viewport={leftViewport}
        setViewport={
          updateLeftViewport
        }
      />
    )
  }

  /* =========================
     HEATMAP ONLY
  ========================== */

  if (mode === "heatmap") {

    return (

      <HeatmapViewer
        image={heatmapImage}
        viewport={rightViewport}
        setViewport={
          updateRightViewport
        }
      />
    )
  }

  return null
}