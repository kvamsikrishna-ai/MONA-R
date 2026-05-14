interface Props {
  impression: string
}

export default function ImpressionPanel({
  impression,
}: Props) {

  return (

    <div className="bg-zinc-900 text-white border border-zinc-800 rounded-xl shadow p-4">

      <h2 className="text-lg font-semibold mb-4">
        Impression
      </h2>

      <p>
        {impression}
      </p>

    </div>
  )
}