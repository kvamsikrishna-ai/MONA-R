"use client"

import { useState }
  from "react"

import { useViewer }
  from "@/hooks/useViewer"

import { CaseItem }
  from "@/types/case"

import DualViewer
  from "@/viewers/DualViewer"

import ViewerToolbar
  from "./ViewerToolbar"

import MetadataPanel
  from "./MetadataPanel"

import FindingsPanel
  from "./FindingsPanel"

import ImpressionPanel
  from "./ImpressionPanel"

import ReviewActions
  from "./ReviewActions"

import OverlayControls
  from "@/workspaces/sandbox/OverlayControls"

import SyncControls
  from "@/workspaces/sandbox/SyncControls"

interface Props {

  caseItem: CaseItem

  onBack: () => void

  onApprove: () => void
}

export default function
DiagnosticWorkspace({

  caseItem,

  onBack,

  onApprove,

}: Props) {

  const {

    mode,

    setMode,

    overlayOpacity,

    setOverlayOpacity,

    syncZoom,

    setSyncZoom,

    syncPan,

    setSyncPan,

  } = useViewer()

  // ==========================================
  // EDITABLE REPORT STATE
  // ==========================================

  const [

    findings,

    setFindings

  ] = useState(

    caseItem.finding
  )

  const [

    impression,

    setImpression

  ] = useState(

    caseItem.finding
  )

  // ==========================================
  // DEBUG
  // ==========================================

  console.log(caseItem)

  console.log(
    "ORIGINAL:",
    caseItem.original_image
  )

  console.log(
    "HEATMAP:",
    caseItem.heatmap_image
  )

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
              mb-3
            "
          >
            ← Back
          </button>

          <h1 className="
            text-4xl
            font-bold
          ">
            Diagnostic Workspace
          </h1>

          <p className="
            text-zinc-500
            mt-2
          ">
            AI-assisted diagnostic
            interpretation environment.
          </p>

        </div>

      </div>

      {/* VIEWER MODES */}

      <ViewerToolbar
        mode={mode}
        onChange={setMode}
      />

      {/* MAIN GRID */}

      <div className="
        grid
        grid-cols-12
        gap-6
      ">

        {/* LEFT VIEWER */}

        <div className="
          col-span-8
          space-y-5
        ">

          <DualViewer

            mode={mode}

            originalImage={
              caseItem.original_image
            }

            heatmapImage={
              caseItem.heatmap_image
            }

            overlayOpacity={
              overlayOpacity
            }

            syncZoom={syncZoom}

            syncPan={syncPan}
          />

        </div>

        {/* RIGHT SIDEBAR */}

        <div className="
          col-span-4
          space-y-5
        ">

          {/* OVERLAY */}

          <OverlayControls
            opacity={overlayOpacity}
            onChange={
              setOverlayOpacity
            }
          />

          {/* SYNC */}

          <SyncControls
            syncZoom={syncZoom}
            syncPan={syncPan}
            onToggleZoom={() =>

              setSyncZoom(
                !syncZoom
              )
            }
            onTogglePan={() =>

              setSyncPan(
                !syncPan
              )
            }
          />

          {/* METADATA */}

          <MetadataPanel
            caseItem={caseItem}
          />

          {/* FINDINGS */}

          <FindingsPanel

            findings={findings}

            setFindings={
              setFindings
            }
          />

          {/* IMPRESSION */}

          <ImpressionPanel

            impression={impression}

            setImpression={
              setImpression
            }
          />

          {/* REVIEW */}

          <ReviewActions

            caseId={caseItem.id}

            onApprove={onApprove}

            onReject={onBack}
          />

        </div>

      </div>

    </div>
  )
}