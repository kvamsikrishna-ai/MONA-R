"use client"

interface Props {

  findings: string

  setFindings: (
    value: string
  ) => void
}

export default function
FindingsPanel({

  findings,

  setFindings,

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
          Findings
        </h2>

        <p className="
          text-zinc-500
          text-sm
          mt-1
        ">
          Editable AI-generated findings.
        </p>

      </div>

      <textarea

        value={findings}

        onChange={(event) =>

          setFindings(
            event.target.value
          )
        }

        className="
          w-full
          min-h-[220px]
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