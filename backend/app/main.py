from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from fastapi.staticfiles import (
    StaticFiles
)

from backend.app.api.routes.cases import (
    router as cases_router
)

from backend.app.api.routes.reports import (
    router as reports_router
)

# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI()

# ==========================================
# CORS
# ==========================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "*"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ==========================================
# STATIC STORAGE
# ==========================================

app.mount(

    "/reports_storage",

    StaticFiles(
        directory="storage/reports"
    ),

    name="reports_storage"
)

app.mount(

    "/scans",

    StaticFiles(
        directory="frontend/public/scans"
    ),

    name="scans"
)

# ==========================================
# ROUTERS
# ==========================================

app.include_router(
    cases_router
)

app.include_router(
    reports_router
)

# ==========================================
# ROOT
# ==========================================

@app.get("/")

def root():

    return {

        "message":
        "MONA-R Backend Running"
    }