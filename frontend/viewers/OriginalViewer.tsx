"use client"

import ViewerEngine
  from "./ViewerEngine"

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
OriginalViewer({

  image,

  viewport,

  setViewport,

}: Props) {

  return (

    <div className="
      space-y-3
    ">

      <p className="
        text-sm
        text-zinc-400
      ">
        Original Scan
      </p>

      <ViewerEngine
        image={image}
        viewport={viewport}
        setViewport={setViewport}
      />

    </div>
  )
}