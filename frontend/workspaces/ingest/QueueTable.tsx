import { CaseItem }
  from "@/types/case"

import CaseRow
  from "./CaseRow"

interface Props {

  cases: CaseItem[]

  onOpenCase: (
    caseItem: CaseItem
  ) => void
}

export default function
QueueTable({

  cases,

  onOpenCase,

}: Props) {

  return (

    <div className="
      overflow-hidden
      rounded-2xl
      border
      border-zinc-800
    ">

      <table className="
        w-full
        bg-zinc-950
      ">

        <thead className="
          bg-zinc-900
        ">

          <tr>

            <th className="
              text-left
              px-4
              py-4
            ">
              Patient
            </th>

            <th className="
              text-left
              px-4
              py-4
            ">
              Age
            </th>

            <th className="
              text-left
              px-4
              py-4
            ">
              Sex
            </th>

            <th className="
              text-left
              px-4
              py-4
            ">
              Finding
            </th>

            <th className="
              text-left
              px-4
              py-4
            ">
              Priority
            </th>

            <th className="
              text-left
              px-4
              py-4
            ">
              Confidence
            </th>

            <th className="
              text-left
              px-4
              py-4
            ">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {cases.map((caseItem) => (

            <CaseRow
              key={caseItem.id}
              caseItem={caseItem}
              onOpenCase={
                onOpenCase
              }
            />

          ))}

        </tbody>

      </table>

    </div>
  )
}