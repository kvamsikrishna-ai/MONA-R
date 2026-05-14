"use client"

import { useEffect }
  from "react"

import { useState }
  from "react"

import { fetchCases }
  from "@/services/caseService"

import { CaseItem }
  from "@/types/case"

export function useCases() {

  const [cases, setCases] =
    useState<CaseItem[]>([])

  const [loading, setLoading] =
    useState(true)

  async function loadCases() {

    try {

      const data =
        await fetchCases()

      setCases(data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    loadCases()

  }, [])

  return {

    cases,

    loading,

    reload: loadCases,
  }
}