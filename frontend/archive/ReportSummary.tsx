import { CaseItem }
  from "@/types/case"

interface Props {

  caseItem: CaseItem
}

export default function
ReportSummary({

  caseItem,

}: Props) {

  return (

    <div className="
      bg-zinc-950
      border
      border-zinc-800
      rounded-2xl
      p-6
      space-y-5
    ">

      <h2 className="
        text-2xl
        font-bold
      ">
        Final Report Summary
      </h2>

      <div className="
        space-y-3
        text-zinc-300
      ">

        <p>
          Patient:
          {" "}
          {caseItem.patient_name}
        </p>

        <p>
          Age/Sex:
          {" "}
          {caseItem.age}
          {" / "}
          {caseItem.sex}
        </p>

        <p>
          Modality:
          {" "}
          {caseItem.modality}
        </p>

        <p>
          AI Finding:
          {" "}
          {caseItem.finding}
        </p>

        <p>
          Confidence:
          {" "}
          {caseItem.confidence}%
        </p>

      </div>

    </div>
  )
}