interface Props {

  originalImage: string

  heatmapImage: string

  opacity: number
}

export default function
OverlayViewer({

  originalImage,

  heatmapImage,

  opacity,

}: Props) {

  return (

    <div className="
      relative
      bg-black
      border
      border-zinc-800
      rounded-2xl
      overflow-hidden
      h-[600px]
    ">

      {/* ORIGINAL */}

      <img
        src={originalImage}
        alt="Original"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-contain
        "
      />

      {/* HEATMAP */}

      <img
        src={heatmapImage}
        alt="Heatmap"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-contain
        "
        style={{
          opacity,
        }}
      />

    </div>
  )
}