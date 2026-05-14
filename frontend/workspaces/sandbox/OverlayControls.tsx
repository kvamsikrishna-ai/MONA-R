interface Props {

  opacity: number

  onChange:
    (value: number) => void
}

export default function
OverlayControls({

  opacity,

  onChange,

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
        Overlay Controls
      </h2>

      <div>

        <div className="
          flex
          justify-between
          mb-2
        ">

          <span className="
            text-zinc-400
          ">
            Opacity
          </span>

          <span className="
            text-cyan-400
          ">
            {Math.round(
              opacity * 100
            )}%
          </span>

        </div>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={opacity}
          onChange={(e) =>
            onChange(
              Number(
                e.target.value
              )
            )
          }
          className="
            w-full
          "
        />

      </div>

    </div>
  )
}