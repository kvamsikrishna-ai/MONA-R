import axios from "axios"

const API_BASE =

  "http://localhost:8000"

// ==========================================
// FETCH REPORTS
// ==========================================

export async function fetchReports() {

  const response = await axios.get(

    `${API_BASE}/reports`
  )

  return response.data
}