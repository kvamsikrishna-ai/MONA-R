import { CaseItem }
  from "@/types/case"

interface Props {

  caseItem: CaseItem
}

export default function MetadataPanel({

  caseItem,

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
        Study Metadata
      </h2>

      <div className="
        text-zinc-300
        space-y-3
      ">

        <p>
          Patient:
          {" "}
          {caseItem.patientName}
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
          Priority:
          {" "}
          {caseItem.priority}
        </p>

      </div>

    </div>
  )
}