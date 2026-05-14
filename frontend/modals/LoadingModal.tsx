interface Props {

  open: boolean
}

export default function
LoadingModal({

  open,

}: Props) {

  if (!open) return null

  return (

    <div className="
      fixed
      inset-0
      bg-black/80
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        bg-zinc-950
        border
        border-zinc-800
        rounded-3xl
        px-10
        py-8
      ">

        <p className="
          text-lg
          text-cyan-400
        ">
          Generating Report...
        </p>

      </div>

    </div>
  )
}