"use client"

import { useWorkspace }
  from "@/hooks/useWorkspace"

import LiveIngestWorkspace
  from "@/workspaces/ingest/LiveIngestWorkspace"

import WhatIfWorkspace
  from "@/workspaces/sandbox/WhatIfWorkspace"

import DiagnosticWorkspace
  from "@/workspaces/diagnostic/DiagnosticWorkspace"

import ReportArchive
  from "@/workspaces/archive/ReportArchive"

export default function HomePage() {

  const {

    mode,

    selectedCase,

    openIngest,

    openSandbox,

    openDiagnostic,

    backToIngest,

    moveToArchive,

    backHome,

  } = useWorkspace()

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">

            {/* TOP BAR */}

            <div className="
              w-full
              flex
              items-center
              justify-between
              px-8
              py-5
              border-b
              border-zinc-900
            ">

              {/* LEFT SECTION */}

              <div className="
                flex
                items-center
                gap-4
              ">

                {/* LOGO */}

                <img
                  src="/logos/monexa-logo.png"
                  alt="Monexa"
                  className="
                    h-14
                    w-auto
                    object-contain
                  "
                />

                {/* TITLE */}

                <div className="
                  flex
                  flex-col
                  justify-center
                ">

                  <h1 className="
                    text-2xl
                    font-bold
                    tracking-wide
                    leading-none
                  ">
                    MONA-R
                  </h1>

                  <p className="
                    text-xs
                    text-zinc-500
                    mt-1
                  ">
                    Monexa Radiology Workspace
                  </p>

                </div>

              </div>

              {/* RIGHT SECTION */}

              <div className="
                text-sm
                text-zinc-500
                hidden
                md:block
              ">
                AI Assisted Radiology Workflow
              </div>

            </div>

      {/* ======================================
          HOME
      ====================================== */}

      {mode === "home" && (

        <div className="
          min-h-[calc(100vh-88px)]
          flex
          items-center
          justify-center
          px-8
        ">

          <div className="
            max-w-6xl
            w-full
            grid
            grid-cols-2
            gap-8
          ">

            {/* LIVE INGEST */}

            <button
              onClick={openIngest}
              className="
                bg-zinc-950
                border
                border-zinc-800
                rounded-3xl
                p-10
                text-left
                hover:border-cyan-500
                transition-all
                duration-300
              "
            >

              <p className="
                text-cyan-400
                text-sm
                mb-3
              ">
                WORKFLOW MODE
              </p>

              <h1 className="
                text-4xl
                font-bold
                mb-4
              ">
                Live Ingestion
              </h1>

              <p className="
                text-zinc-500
                leading-relaxed
              ">
                Real-time AI assisted
                radiology review and
                diagnostic workflow.
              </p>

            </button>

            {/* SANDBOX */}

            <button
              onClick={openSandbox}
              className="
                bg-zinc-950
                border
                border-zinc-800
                rounded-3xl
                p-10
                text-left
                hover:border-cyan-500
                transition-all
                duration-300
              "
            >

              <p className="
                text-cyan-400
                text-sm
                mb-3
              ">
                EXPLORATION MODE
              </p>

              <h1 className="
                text-4xl
                font-bold
                mb-4
              ">
                What-If Sandbox
              </h1>

              <p className="
                text-zinc-500
                leading-relaxed
              ">
                Analyze overlays,
                compare heatmaps and
                evaluate AI behavior.
              </p>

            </button>

          </div>

        </div>
      )}

      {/* ======================================
          INGEST
      ====================================== */}

      {mode === "ingest" && (

        <LiveIngestWorkspace
          onBack={backHome}
          onOpenCase={
            openDiagnostic
          }
        />

      )}

      {/* ======================================
          SANDBOX
      ====================================== */}

      {mode === "sandbox" && (

        <WhatIfWorkspace
          onBack={backHome}
        />

      )}

      {/* ======================================
          DIAGNOSTIC
      ====================================== */}

      {mode === "diagnostic"
        && selectedCase && (

        <DiagnosticWorkspace
          caseItem={selectedCase}
          onBack={
            backToIngest
          }
          onApprove={
            moveToArchive
          }
        />

      )}

      {/* ======================================
          ARCHIVE
      ====================================== */}

      {mode === "archive" && (

        <ReportArchive />

      )}

    </main>
  )
}