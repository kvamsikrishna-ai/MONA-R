import axios from "axios"

const API = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL
})

/* =========================================
   FETCH CASES
========================================= */

export async function fetchCases() {

  const response = await API.get(
    "/cases"
  )

  return response.data
}

/* =========================================
   APPROVE CASE
========================================= */

export async function approveCase(
  caseId: string
) {

  const response = await API.post(

    `/cases/${caseId}/approve`
  )

  return response.data
}

/* =========================================
   REJECT CASE
========================================= */

export async function rejectCase(
  caseId: string
) {

  const response = await API.post(

    `/cases/${caseId}/reject`
  )

  return response.data
}

/* =========================================
   FETCH REPORTS
========================================= */

export async function fetchReports() {

  const response = await API.get(
    "/reports"
  )

  return response.data
}