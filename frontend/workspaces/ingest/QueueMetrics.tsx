interface Props {

  title: string

  value: number

  description: string
}

export default function QueueMetrics({

  title,

  value,

  description,

}: Props) {

  return (

    <div className="
      bg-zinc-950
      border
      border-zinc-800
      rounded-2xl
      p-6
    ">

      <p className="
        text-zinc-500
        text-sm
        mb-3
      ">
        {title}
      </p>

      <h2 className="
        text-4xl
        font-bold
        mb-3
      ">
        {value}
      </h2>

      <p className="
        text-zinc-500
        text-sm
      ">
        {description}
      </p>

    </div>
  )
}