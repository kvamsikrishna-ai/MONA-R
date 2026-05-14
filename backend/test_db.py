from backend.app.db.database import (
    supabase
)

response = supabase.table(
    "cases"
).select("*").execute()

print(response)