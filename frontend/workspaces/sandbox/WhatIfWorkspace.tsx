"use client"

import { useState }
  from "react"

import { useViewer }
  from "@/hooks/useViewer"

import DualViewer
  from "@/viewers/DualViewer"

import UploadZone
  from "./UploadZone"

import ViewerModes
  from "./ViewerModes"

import OverlayControls
  from "./OverlayControls"

import SyncControls
  from "./SyncControls"

interface Props {

  onBack: () => void
}

export default function
WhatIfWorkspace({

  onBack,

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

  const [uploadedImage,
    setUploadedImage] =

    useState<string | null>(
      null
    )

  function handleUpload(
    file: File
  ) {

    const imageUrl =
      URL.createObjectURL(file)

    setUploadedImage(imageUrl)
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
          What-If Sandbox
        </h1>

        <p className="
          text-zinc-500
          mt-2
        ">
          Interactive AI-assisted
          exploratory analysis
          environment.
        </p>

      </div>

      {/* UPLOAD */}

      {!uploadedImage && (

        <UploadZone
          onUpload={handleUpload}
        />

      )}

      {/* WORKSPACE */}

      {uploadedImage && (

        <div className="
          grid
          grid-cols-12
          gap-6
        ">

          {/* LEFT */}

          <div className="
            col-span-8
            space-y-5
          ">

            {/* MODES */}

            <ViewerModes
              mode={mode}
              onChange={setMode}
            />

            {/* VIEWER */}

            <DualViewer
            mode={mode}
            originalImage={
                uploadedImage
            }
            heatmapImage="
                /scans/heatmaps/sample1_heatmap.png
            "
            overlayOpacity={
                overlayOpacity
            }
            syncZoom={syncZoom}
            syncPan={syncPan}
            />

          </div>

          {/* RIGHT */}

          <div className="
            col-span-4
            space-y-5
          ">

            <OverlayControls
              opacity={
                overlayOpacity
              }
              onChange={
                setOverlayOpacity
              }
            />

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

            {/* AI PANEL */}

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
                AI Analysis
              </h2>

              <div className="
                space-y-3
                text-zinc-300
              ">

                <p>
                  Finding:
                  {" "}
                  Pneumonia
                </p>

                <p>
                  Confidence:
                  {" "}
                  91%
                </p>

                <p>
                  Priority:
                  {" "}
                  HIGH
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}