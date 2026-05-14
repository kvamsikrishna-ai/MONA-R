import axios from "axios"

const API = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL
})

/* =========================================
   FETCH REPORTS
========================================= */

export async function fetchReports() {

  const response = await API.get(
    "/reports"
  )

  return response.data
}