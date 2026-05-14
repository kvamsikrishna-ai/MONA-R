import { CaseItem }
  from "@/types/case"

import { AuditEvent }
  from "@/types/audit"

import PDFViewer
  from "./PDFViewer"

import ReportSummary
  from "./ReportSummary"

import AuditHistory
  from "./AuditHistory"

interface Props {

  caseItem: CaseItem

  onBack: () => void
}

const auditEvents: AuditEvent[] = [

  {
    id: "1",

    action:
      "AI analysis completed",

    user: "MONA AI",

    timestamp:
      "13 May 2026 · 10:14 AM",
  },

  {
    id: "2",

    action:
      "Radiologist approved report",

    user:
      "Dr. Sharma",

    timestamp:
      "13 May 2026 · 10:22 AM",
  },
]

export default function
ArchiveWorkspace({

  caseItem,

  onBack,

}: Props) {

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      p-6
      space-y-6
    ">

      {/* HEADER */}

      <div>

        <button
          onClick={onBack}
          className="
            text-zinc-500
            mb-4
          "
        >
          ← Back
        </button>

        <h1 className="
          text-4xl
          font-bold
        ">
          Report Archive
        </h1>

        <p className="
          text-zinc-500
          mt-2
        ">
          Finalized and archived
          radiology reports.
        </p>

      </div>

      {/* GRID */}

      <div className="
        grid
        grid-cols-12
        gap-6
      ">

        {/* LEFT */}

        <div className="
          col-span-8
        ">

          <PDFViewer />

        </div>

        {/* RIGHT */}

        <div className="
          col-span-4
          space-y-5
        ">

          <ReportSummary
            caseItem={caseItem}
          />

          <AuditHistory
            events={auditEvents}
          />

        </div>

      </div>

    </div>
  )
}