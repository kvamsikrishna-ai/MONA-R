from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles


from fastapi.middleware.cors import (
    CORSMiddleware
)

from backend.app.api.routes.cases import (
    router as cases_router
)

from backend.app.api.routes.reports import (
    router as reports_router
)

from backend.app.api.routes.reports import (
    router as reports_router
)
from fastapi.staticfiles import (
    StaticFiles
)

app = FastAPI()
# ==========================================
# STATIC PDF STORAGE
# ==========================================
app.add_middleware(
    CORSMiddleware,

    allow_origins=[

        "http://localhost:3000",

        "https://YOUR-VERCEL-URL.vercel.app",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.mount(
    "/reports_storage",
    StaticFiles(directory="storage/reports"),
    name="reports_storage"
)

app.mount(
    "/scans",
    StaticFiles(directory="frontend/public/scans"),
    name="scans"
)
# ==========================================
# CORS
# ==========================================
app.include_router(
    reports_router
)

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
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