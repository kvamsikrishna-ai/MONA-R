"use client"

import {
  useState,
  useRef,
} from "react"

import {
  ViewportState,
} from "@/state/viewerState"

interface Props {

  image: string

  viewport: ViewportState

  setViewport:
    (
      viewport: ViewportState
    ) => void
}

export default function
ViewerEngine({

  image,

  viewport,

  setViewport,

}: Props) {

  const containerRef =
    useRef<HTMLDivElement>(null)

  const [dragging,
    setDragging] =

    useState(false)

  const [lastX,
    setLastX] =

    useState(0)

  const [lastY,
    setLastY] =

    useState(0)

  /* =========================
     ZOOM
  ========================== */

  function handleWheel(
    event:
    React.WheelEvent
  ) {

    event.preventDefault()

    const delta =
      event.deltaY > 0
      ? -0.1
      : 0.1

    const nextZoom =
      Math.min(
        Math.max(
          viewport.zoom + delta,
          0.5
        ),
        5
      )

    setViewport({

      ...viewport,

      zoom: nextZoom,
    })
  }

  /* =========================
     DRAG START
  ========================== */

  function handleMouseDown(
    event:
    React.MouseEvent
  ) {

    setDragging(true)

    setLastX(event.clientX)

    setLastY(event.clientY)
  }

  /* =========================
     DRAG MOVE
  ========================== */

  function handleMouseMove(
    event:
    React.MouseEvent
  ) {

    if (!dragging) return

    const dx =
      event.clientX - lastX

    const dy =
      event.clientY - lastY

    setViewport({

      ...viewport,

      offsetX:
        viewport.offsetX + dx,

      offsetY:
        viewport.offsetY + dy,
    })

    setLastX(event.clientX)

    setLastY(event.clientY)
  }

  /* =========================
     DRAG END
  ========================== */

  function handleMouseUp() {

    setDragging(false)
  }

  return (

    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="
        relative
        overflow-hidden
        bg-black
        h-[600px]
        rounded-2xl
        border
        border-zinc-800
        cursor-grab
      "
    >

      <img
        src={image}
        alt="Viewer"
        draggable={false}
        className="
          absolute
          top-0
          left-0
          w-full
          h-full
          object-contain
          select-none
        "
        style={{

          transform: `
            translate(
              ${viewport.offsetX}px,
              ${viewport.offsetY}px
            )
            scale(${viewport.zoom})
          `,

          transition:
            dragging
            ? "none"
            : "transform 0.05s",
        }}
      />

    </div>
  )
}