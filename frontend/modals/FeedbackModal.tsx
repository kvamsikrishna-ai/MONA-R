interface Props {

  open: boolean

  onClose: () => void
}

export default function
FeedbackModal({

  open,

  onClose,

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
        p-8
        w-[500px]
        space-y-5
      ">

        <h2 className="
          text-2xl
          font-bold
        ">
          Feedback
        </h2>

        <textarea
          placeholder="
            Enter review feedback...
          "
          className="
            w-full
            h-40
            bg-zinc-900
            rounded-xl
            p-4
            outline-none
            resize-none
          "
        />

        <button
          onClick={onClose}
          className="
            w-full
            py-3
            rounded-xl
            bg-cyan-500
            text-black
            font-semibold
          "
        >

          Submit Feedback

        </button>

      </div>

    </div>
  )
}