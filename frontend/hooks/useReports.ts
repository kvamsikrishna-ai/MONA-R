"use client"

import {

  useEffect,

  useState,

} from "react"

import {

  fetchReports

} from "@/services/reportService"

export function useReports() {

  const [

    reports,

    setReports

  ] = useState([])

  const [

    loading,

    setLoading

  ] = useState(true)

  async function loadReports() {

    try {

      const data = await fetchReports()

      setReports(data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    loadReports()

  }, [])

  return {

    reports,

    loading,

    reload: loadReports,
  }
}