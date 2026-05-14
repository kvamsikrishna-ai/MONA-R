"use client"

import { CaseItem }
  from "@/types/case"

import { useCases }
  from "@/hooks/useCases"

import QueueMetrics
  from "./QueueMetrics"

import QueueFilters
  from "./QueueFilters"

import QueueTable
  from "./QueueTable"

interface Props {

  onOpenCase: (
    caseItem: CaseItem
  ) => void

  onBack: () => void
}

export default function
LiveIngestWorkspace({

  onOpenCase,

  onBack,

}: Props) {

  const {

    cases,

    loading,

  } = useCases()

  /* =========================
     PRIORITY SPLIT
  ========================== */

  const abnormalCases =
    cases.filter(

      (item) =>

        item.priority === "HIGH"
    )

  const normalCases =
    cases.filter(

      (item) =>

        item.priority !== "HIGH"
    )

  /* =========================
     LOADING
  ========================== */

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">

        <p className="
          text-zinc-500
          text-lg
        ">
          Loading ingest queue...
        </p>

      </div>
    )
  }

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      p-6
      space-y-6
    ">

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
      ">

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
            Live Ingestion
          </h1>

          <p className="
            text-zinc-500
            mt-2
          ">
            Real-time radiology
            workflow queue.
          </p>

        </div>

        <img
          src="/logos/monexa.png"
          alt="Monexa"
          className="
            w-14
            h-14
          "
        />

      </div>

      {/* METRICS */}

      <div className="
        grid
        grid-cols-3
        gap-5
      ">

        <QueueMetrics
          title="Total Cases"
          value={cases.length}
          description="
            Total studies in queue
          "
        />

        <QueueMetrics
          title="High Priority"
          value={abnormalCases.length}
          description="
            AI flagged urgent studies
          "
        />

        <QueueMetrics
          title="Normal Queue"
          value={normalCases.length}
          description="
            Standard review cases
          "
        />

      </div>

      {/* FILTERS */}

      <QueueFilters />

      {/* HIGH PRIORITY */}

      <div className="
        space-y-4
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <h2 className="
            text-2xl
            font-bold
            text-red-400
          ">
            High Priority Queue
          </h2>

          <p className="
            text-zinc-500
          ">
            {
              abnormalCases.length
            }
            {" "}
            cases
          </p>

        </div>

        <QueueTable
          cases={abnormalCases}
          onOpenCase={
            onOpenCase
          }
        />

      </div>

      {/* NORMAL PRIORITY */}

      <div className="
        space-y-4
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <h2 className="
            text-2xl
            font-bold
            text-cyan-400
          ">
            Normal Queue
          </h2>

          <p className="
            text-zinc-500
          ">
            {
              normalCases.length
            }
            {" "}
            cases
          </p>

        </div>

        <QueueTable
          cases={normalCases}
          onOpenCase={
            onOpenCase
          }
        />

      </div>

    </div>
  )
}