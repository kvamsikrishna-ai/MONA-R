interface Props {

  pdfUrl?: string
}

export default function
PDFViewer({

  pdfUrl,

}: Props) {

  return (

    <div className="
      bg-zinc-950
      border
      border-zinc-800
      rounded-2xl
      overflow-hidden
      h-[700px]
    ">

      <div className="
        px-5
        py-4
        border-b
        border-zinc-800
      ">

        <h2 className="
          text-xl
          font-semibold
        ">
          Archived Report PDF
        </h2>

      </div>

      {pdfUrl ? (

        <iframe
          src={pdfUrl}
          className="
            w-full
            h-full
          "
        />

      ) : (

        <div className="
          h-full
          flex
          items-center
          justify-center
          text-zinc-500
        ">

          PDF preview unavailable

        </div>

      )}

    </div>
  )
}