"use client"

import { CaseItem }
  from "@/types/case"

interface Props {

  caseItem: CaseItem

  onOpenCase: (
    caseItem: CaseItem
  ) => void
}

export default function
CaseRow({

  caseItem,

  onOpenCase,

}: Props) {

  return (

    <tr className="
      border-b
      border-zinc-800
      hover:bg-zinc-900
      transition
    ">

      <td className="
        px-4
        py-4
      ">
        {caseItem.patient_name}
      </td>

      <td className="
        px-4
        py-4
      ">
        {caseItem.age}
      </td>

      <td className="
        px-4
        py-4
      ">
        {caseItem.sex}
      </td>

      <td className="
        px-4
        py-4
      ">
        {caseItem.finding}
      </td>

      <td className="
        px-4
        py-4
      ">

        <span className="
          px-3
          py-1
          rounded-full
          text-sm
          bg-red-500/20
          text-red-400
        ">

          {caseItem.priority}

        </span>

      </td>

      <td className="
        px-4
        py-4
      ">
        {caseItem.confidence}%
      </td>

      <td className="
        px-4
        py-4
      ">

        <button
          onClick={() =>
            onOpenCase(caseItem)
          }
          className="
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            px-4
            py-2
            rounded-xl
            font-medium
          "
        >

          Open Case

        </button>

      </td>

    </tr>
  )
}