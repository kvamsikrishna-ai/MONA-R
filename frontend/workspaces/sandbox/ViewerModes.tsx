import { ViewerMode }
  from "@/types/viewer"

interface Props {

  mode: ViewerMode

  onChange:
    (mode: ViewerMode) => void
}

export default function
ViewerModes({

  mode,

  onChange,

}: Props) {

  const modes: ViewerMode[] = [

    "split",

    "overlay",

    "original",

    "heatmap",
  ]

  return (

    <div className="
      flex
      gap-3
      flex-wrap
    ">

      {modes.map((item) => (

        <button
          key={item}
          onClick={() =>
            onChange(item)
          }
          className={`
            px-4
            py-2
            rounded-xl
            text-sm
            font-medium
            transition

            ${
              mode === item

              ? "bg-cyan-500 text-black"

              : "bg-zinc-900 text-zinc-400"
            }
          `}
        >

          {item.toUpperCase()}

        </button>

      ))}

    </div>
  )
}