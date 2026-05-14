"use client"

interface Props {

  impression: string

  setImpression: (
    value: string
  ) => void
}

export default function
ImpressionPanel({

  impression,

  setImpression,

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

      <div>

        <h2 className="
          text-lg
          font-semibold
        ">
          Impression
        </h2>

        <p className="
          text-zinc-500
          text-sm
          mt-1
        ">
          Final clinical interpretation.
        </p>

      </div>

      <textarea

        value={impression}

        onChange={(event) =>

          setImpression(
            event.target.value
          )
        }

        className="
          w-full
          min-h-[160px]
          bg-zinc-900
          border
          border-zinc-800
          rounded-xl
          p-4
          text-sm
          resize-none
          outline-none
          focus:border-cyan-500
        "
      />

    </div>
  )
}