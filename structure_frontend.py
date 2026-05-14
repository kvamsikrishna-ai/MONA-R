from pathlib import Path

import shutil

# ==========================================
# FRONTEND ROOT
# ==========================================

ROOT = Path("frontend")

# ==========================================
# SAFE REMOVE
# ONLY APPLICATION LAYERS
# ==========================================

remove_folders = [

    "components",
    "hooks",
    "services",
    "types",
    "styles",
    "state",
    "workspaces",
    "viewers",
    "archive",
    "modals",
    "utils",
]

# ==========================================
# REMOVE OLD STRUCTURE
# ==========================================

for folder in remove_folders:

    folder_path = ROOT / folder

    if folder_path.exists():

        shutil.rmtree(folder_path)

        print(f"❌ Removed: {folder_path}")

# ==========================================
# NEW FOLDER STRUCTURE
# ==========================================

folders = [

    # APP
    "app",

    # WORKSPACES
    "workspaces/ingest",
    "workspaces/diagnostic",
    "workspaces/sandbox",

    # VIEWERS
    "viewers",

    # ARCHIVE
    "archive",

    # MODALS
    "modals",

    # SERVICES
    "services",

    # HOOKS
    "hooks",

    # STATE
    "state",

    # TYPES
    "types",

    # PUBLIC
    "public/logos",
    "public/scans/original",
    "public/scans/heatmaps",
    "public/icons",

    # STYLES
    "styles",
]

# ==========================================
# FILES
# ==========================================

files = [

    # ======================================
    # APP
    # ======================================

    "app/page.tsx",
    "app/layout.tsx",
    "app/globals.css",

    # ======================================
    # INGEST WORKSPACE
    # ======================================

    "workspaces/ingest/LiveIngestWorkspace.tsx",
    "workspaces/ingest/QueueTable.tsx",
    "workspaces/ingest/QueueFilters.tsx",
    "workspaces/ingest/QueueMetrics.tsx",
    "workspaces/ingest/CaseRow.tsx",

    # ======================================
    # DIAGNOSTIC WORKSPACE
    # ======================================

    "workspaces/diagnostic/DiagnosticWorkspace.tsx",
    "workspaces/diagnostic/ViewerToolbar.tsx",
    "workspaces/diagnostic/FindingsPanel.tsx",
    "workspaces/diagnostic/ImpressionPanel.tsx",
    "workspaces/diagnostic/MetadataPanel.tsx",
    "workspaces/diagnostic/AuditTrail.tsx",
    "workspaces/diagnostic/ReviewActions.tsx",

    # ======================================
    # SANDBOX WORKSPACE
    # ======================================

    "workspaces/sandbox/WhatIfWorkspace.tsx",
    "workspaces/sandbox/UploadZone.tsx",
    "workspaces/sandbox/OverlayControls.tsx",
    "workspaces/sandbox/ViewerModes.tsx",
    "workspaces/sandbox/SyncControls.tsx",

    # ======================================
    # VIEWERS
    # ======================================

    "viewers/DualViewer.tsx",
    "viewers/OverlayViewer.tsx",
    "viewers/OriginalViewer.tsx",
    "viewers/HeatmapViewer.tsx",
    "viewers/ViewerEngine.tsx",

    # ======================================
    # ARCHIVE
    # ======================================

    "archive/ArchiveWorkspace.tsx",
    "archive/PDFViewer.tsx",
    "archive/ReportSummary.tsx",
    "archive/AuditHistory.tsx",

    # ======================================
    # MODALS
    # ======================================

    "modals/RejectModal.tsx",
    "modals/FeedbackModal.tsx",
    "modals/LoadingModal.tsx",

    # ======================================
    # SERVICES
    # ======================================

    "services/api.ts",
    "services/caseService.ts",
    "services/reportService.ts",
    "services/viewerService.ts",

    # ======================================
    # HOOKS
    # ======================================

    "hooks/useWorkspace.ts",
    "hooks/useCases.ts",
    "hooks/useViewer.ts",
    "hooks/useOverlay.ts",

    # ======================================
    # STATE
    # ======================================

    "state/workspaceState.ts",
    "state/viewerState.ts",
    "state/caseState.ts",

    # ======================================
    # TYPES
    # ======================================

    "types/case.ts",
    "types/report.ts",
    "types/viewer.ts",
    "types/audit.ts",

    # ======================================
    # STYLES
    # ======================================

    "styles/workstation.css",
    "styles/viewer.css",
]

# ==========================================
# CREATE FOLDERS
# ==========================================

for folder in folders:

    folder_path = ROOT / folder

    folder_path.mkdir(
        parents=True,
        exist_ok=True
    )

# ==========================================
# CREATE FILES
# ==========================================

for file in files:

    file_path = ROOT / file

    file_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    if not file_path.exists():

        file_path.write_text("")

# ==========================================
# DONE
# ==========================================

print("\n✅ NEW FRONTEND ARCHITECTURE CREATED\n")

print("Preserved:")
print("• node_modules")
print("• package.json")
print("• next.config.ts")
print("• tsconfig.json")
print("• .next")
print("• runtime configs")

print("\nNew architecture ready.\n")

for path in sorted(ROOT.rglob("*")):

    print(path)