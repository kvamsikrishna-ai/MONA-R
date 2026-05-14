from pathlib import Path

ROOT = Path("frontend")

# =========================================
# FOLDERS
# =========================================

folders = [

    # APP
    "app",

    # WORKSPACES
    "workspaces/ingest",
    "workspaces/diagnostic",
    "workspaces/archive",

    # COMPONENTS
    "components/layout",

    "components/viewers",

    "components/report",

    "components/actions",

    "components/queue",

    "components/upload",

    "components/archive",

    # SERVICES
    "services",

    # HOOKS
    "hooks",

    # TYPES
    "types",

    # STATE
    "state",

    # STYLES
    "styles",

    # PUBLIC ASSETS
    "public/logos",

    "public/scans/original",

    "public/scans/heatmaps",

    # UTILS
    "utils",
]

# =========================================
# FILES
# =========================================

files = [

    # APP
    "app/page.tsx",
    "app/layout.tsx",
    "app/globals.css",

    # WORKSPACES
    "workspaces/ingest/LiveIngestWorkspace.tsx",

    "workspaces/ingest/WhatIfWorkspace.tsx",

    "workspaces/diagnostic/DiagnosticWorkspace.tsx",

    "workspaces/archive/ReportArchiveWorkspace.tsx",

    # LAYOUT
    "components/layout/Header.tsx",

    "components/layout/Sidebar.tsx",

    # VIEWERS
    "components/viewers/OriginalScanViewer.tsx",

    "components/viewers/AIOverlayViewer.tsx",

    "components/viewers/DualViewer.tsx",

    "components/viewers/ViewerToolbar.tsx",

    # REPORT
    "components/report/MetadataPanel.tsx",

    "components/report/FindingsPanel.tsx",

    "components/report/ImpressionPanel.tsx",

    "components/report/ReportEditor.tsx",

    # ACTIONS
    "components/actions/ApproveButton.tsx",

    "components/actions/RejectButton.tsx",

    "components/actions/EditButton.tsx",

    # QUEUE
    "components/queue/CaseQueue.tsx",

    "components/queue/QueueCard.tsx",

    # UPLOAD
    "components/upload/UploadDropzone.tsx",

    # ARCHIVE
    "components/archive/ReportCard.tsx",

    "components/archive/PDFViewer.tsx",

    # SERVICES
    "services/api.ts",

    "services/reportService.ts",

    # HOOKS
    "hooks/useAnalysis.ts",

    "hooks/useWorkspace.ts",

    # STATE
    "state/workspaceState.ts",

    # TYPES
    "types/report.ts",

    "types/case.ts",

    # UTILS
    "utils/image.ts",

    # STYLES
    "styles/workstation.css",
]

# =========================================
# CREATE FOLDERS
# =========================================

for folder in folders:

    path = ROOT / folder

    path.mkdir(
        parents=True,
        exist_ok=True
    )

# =========================================
# CREATE FILES
# =========================================

for file in files:

    path = ROOT / file

    path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    if not path.exists():

        path.write_text("")

# =========================================
# DONE
# =========================================

print(
    "\\n✅ MONA-R FRONTEND V2 STRUCTURE CREATED\\n"
)

for item in sorted(ROOT.rglob("*")):

    print(item)