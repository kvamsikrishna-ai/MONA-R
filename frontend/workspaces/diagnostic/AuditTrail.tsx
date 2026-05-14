import { AuditEvent }
  from "@/types/audit"

interface Props {

  events: AuditEvent[]
}

export default function
AuditTrail({

  events,

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

      <h2 className="
        text-xl
        font-semibold
      ">
        Audit Trail
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
              text-white
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