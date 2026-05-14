"use client"

import { useState }
  from "react"

import { WorkspaceMode }
  from "@/types/workflow"

import { CaseItem }
  from "@/types/case"

export function useWorkspace() {

  const [mode, setMode] =
    useState<WorkspaceMode>(
      "home"
    )

  const [selectedCase,
    setSelectedCase] =

    useState<CaseItem | null>(
      null
    )

  /* =========================
     HOME
  ========================== */

  function openIngest() {

    setMode("ingest")
  }

  function openSandbox() {

    setMode("sandbox")
  }

  function backHome() {

    setMode("home")
  }

  /* =========================
     DIAGNOSTIC
  ========================== */

  function openDiagnostic(
    caseItem: CaseItem
  ) {

    setSelectedCase(caseItem)

    setMode("diagnostic")
  }

  function backToIngest() {

    setMode("ingest")
  }

  /* =========================
     ARCHIVE
  ========================== */

  function moveToArchive() {

    setMode("archive")
  }

  return {

    mode,

    selectedCase,

    openIngest,

    openSandbox,

    openDiagnostic,

    backToIngest,

    moveToArchive,

    backHome,
  }
}