import os

from dotenv import load_dotenv

from supabase import create_client

# ==========================================
# LOAD ENV VARIABLES
# ==========================================

load_dotenv()

# ==========================================
# GET ENV VARIABLES
# ==========================================

SUPABASE_URL = os.getenv(
    "SUPABASE_URL"
)

SUPABASE_KEY = os.getenv(
    "SUPABASE_KEY"
)

# ==========================================
# CREATE CLIENT
# =========================================

supabase = create_client(

    SUPABASE_URL,

    SUPABASE_KEY
)