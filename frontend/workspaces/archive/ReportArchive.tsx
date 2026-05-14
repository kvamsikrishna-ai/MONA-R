"use client"

import {

  useReports

} from "@/hooks/useReports"

export default function
ReportArchive() {

  const {

    reports,

    loading,

  } = useReports()

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-black
        text-white
        p-6
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-3
        ">
          Report Archive
        </h1>

        <p className="
          text-zinc-500
        ">
          Loading archived reports...
        </p>

      </div>
    )
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (reports.length === 0) {

    return (

      <div className="
        min-h-screen
        bg-black
        text-white
        p-6
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-3
        ">
          Report Archive
        </h1>

        <p className="
          text-zinc-500
        ">
          No archived reports found.
        </p>

      </div>
    )
  }

  // ==========================================
  // LATEST REPORT
  // ==========================================

  const latestReport = reports[0]

  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      p-6
      space-y-6
    ">

      {/* HEADER */}

      <div>

        <h1 className="
          text-4xl
          font-bold
        ">
          Report Archive
        </h1>

        <p className="
          text-zinc-500
          mt-2
        ">
          Finalized and archived
          radiology reports.
        </p>

      </div>

      {/* REPORT CARD */}

      <div
        className="
          bg-zinc-950
          border
          border-zinc-800
          rounded-2xl
          p-5
          space-y-6
        "
      >

        {/* TOP */}

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>

            <p className="
              text-sm
              text-zinc-500
            ">
              Case ID
            </p>

            <p className="
              font-mono
              text-sm
            ">
              {latestReport.case_id}
            </p>

          </div>

          <div className="
            text-right
          ">

            <p className="
              text-sm
              text-zinc-500
            ">
              Approved By
            </p>

            <p className="
              text-sm
            ">
              {latestReport.approved_by}
            </p>

          </div>

        </div>

        {/* IMPRESSION */}

        <div>

          <p className="
            text-sm
            text-zinc-500
            mb-2
          ">
            Impression
          </p>

          <p className="
            text-sm
            leading-relaxed
          ">
            {latestReport.impression}
          </p>

        </div>

        {/* IMAGES */}

        <div className="
          grid
          grid-cols-2
          gap-5
        ">





        </div>

        {/* PDF */}

        <div className="
          space-y-3
        ">

          <p className="
            text-sm
            text-zinc-500
          ">
            Archived Report PDF
          </p>

          <iframe
            src={
              `http://127.0.0.1:8000${latestReport.pdf_path}`
            }
            className="
              w-full
              h-[900px]
              rounded-xl
              border
              border-zinc-800
              bg-white
            "
          />

        </div>

      </div>

    </div>
  )
}