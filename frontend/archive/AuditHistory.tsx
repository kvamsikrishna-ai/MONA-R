import { AuditEvent }
  from "@/types/audit"

interface Props {

  events: AuditEvent[]
}

export default function
AuditHistory({

  events,

}: Props) {

  return (

    <div className="
      bg-zinc-950
      border
      border-zinc-800
      rounded-2xl
      p-6
      space-y-4
    ">

      <h2 className="
        text-2xl
        font-bold
      ">
        Workflow History
      </h2>

      <div className="
        space-y-4
      ">

        {events.map((event) => (

          <div
            key={event.id}
            className="
              border-l
              border-cyan-500
              pl-4
            "
          >

            <p className="
              font-medium
            ">
              {event.action}
            </p>

            <p className="
              text-zinc-500
              text-sm
            ">
              {event.user}
            </p>

            <p className="
              text-zinc-600
              text-xs
            ">
              {event.timestamp}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}