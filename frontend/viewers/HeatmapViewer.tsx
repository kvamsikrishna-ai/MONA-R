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
HeatmapViewer({

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
        AI Heatmap
      </p>

      <ViewerEngine
        image={image}
        viewport={viewport}
        setViewport={setViewport}
      />

    </div>
  )
}