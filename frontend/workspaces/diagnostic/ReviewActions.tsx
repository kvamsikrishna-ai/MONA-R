"use client"

import {

  approveCase,

  rejectCase,

} from "@/services/caseService"

interface Props {

  caseId: string

  onApprove: () => void

  onReject?: () => void
}

export default function
ReviewActions({

  caseId,

  onApprove,

  onReject,

}: Props) {

  async function handleApprove() {

    try {

      await approveCase(caseId)

      onApprove()

    } catch (error) {

      console.error(error)
    }
  }

  async function handleReject() {

    try {

      await rejectCase(caseId)

      if (onReject) {

        onReject()
      }

    } catch (error) {

      console.error(error)
    }
  }

  return (

    <div className="
      bg-zinc-950
      border
      border-zinc-800
      rounded-2xl
      p-5
      space-y-4
    ">

      <button
        onClick={handleApprove}
        className="
          w-full
          bg-green-600
          hover:bg-green-500
          transition-all
          py-3
          rounded-xl
          font-semibold
        "
      >
        Approve Report
      </button>

      <button
        onClick={handleReject}
        className="
          w-full
          bg-red-600
          hover:bg-red-500
          transition-all
          py-3
          rounded-xl
          font-semibold
        "
      >
        Reject Report
      </button>

    </div>
  )
}