interface Props {

  syncZoom: boolean

  syncPan: boolean

  onToggleZoom: () => void

  onTogglePan: () => void
}

export default function
SyncControls({

  syncZoom,

  syncPan,

  onToggleZoom,

  onTogglePan,

}: Props) {

  return (

    <div className="
      bg-zinc-950
      border
      border-zinc-800
      rounded-2xl
      p-5
      space-y-4
    ">

      <h2 className="
        text-lg
        font-semibold
      ">
        Sync Controls
      </h2>

      <button
        onClick={onToggleZoom}
        className="
          w-full
          bg-zinc-900
          py-3
          rounded-xl
        "
      >

        Zoom Sync:
        {" "}
        {syncZoom
          ? "ON"
          : "OFF"}

      </button>

      <button
        onClick={onTogglePan}
        className="
          w-full
          bg-zinc-900
          py-3
          rounded-xl
        "
      >

        Pan Sync:
        {" "}
        {syncPan
          ? "ON"
          : "OFF"}

      </button>

    </div>
  )
}