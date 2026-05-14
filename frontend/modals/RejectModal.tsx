interface Props {

  open: boolean

  onClose: () => void

  onReject: () => void
}

export default function
RejectModal({

  open,

  onClose,

  onReject,

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
          Reject Report
        </h2>

        <textarea
          placeholder="
            Enter rejection reason...
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

        <div className="
          flex
          justify-end
          gap-4
        ">

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              bg-zinc-800
            "
          >
            Cancel
          </button>

          <button
            onClick={onReject}
            className="
              px-5
              py-2
              rounded-xl
              bg-red-600
            "
          >
            Reject
          </button>

        </div>

      </div>

    </div>
  )
}