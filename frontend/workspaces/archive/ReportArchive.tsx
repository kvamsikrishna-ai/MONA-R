"use client"

import {

  useReports

} from "@/hooks/useReports"

const API_BASE =

  process.env
    .NEXT_PUBLIC_API_URL

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
  // PDF URL
  // ==========================================

  const pdfUrl =

    `${API_BASE}${latestReport.pdf_path}`

  // ==========================================
  // IMAGE URLS
  // ==========================================

const originalImage =

  latestReport.original_image

    ? `${API_BASE}${latestReport.original_image}`

    : null

const heatmapImage =

  latestReport.heatmap_image

    ? `${API_BASE}${latestReport.heatmap_image}`

    : null

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

          {/* ORIGINAL */}

          <div
            className="
              bg-black
              border
              border-zinc-800
              rounded-2xl
              overflow-hidden
            "
          >

            <div className="
              p-3
              border-b
              border-zinc-800
            ">

              <p className="
                text-sm
                text-zinc-400
              ">
                Original Scan
              </p>

            </div>

            {originalImage ? (

              <img
                src={originalImage}
                alt="Original Scan"
                className="
                  w-full
                  h-[420px]
                  object-contain
                  bg-black
                "
              />

            ) : (

              <div className="
                h-[420px]
                flex
                items-center
                justify-center
                text-zinc-600
                text-sm
              ">
                No Original Scan
              </div>

            )}

          </div>

          {/* HEATMAP */}

          <div
            className="
              bg-black
              border
              border-zinc-800
              rounded-2xl
              overflow-hidden
            "
          >

            <div className="
              p-3
              border-b
              border-zinc-800
            ">

              <p className="
                text-sm
                text-zinc-400
              ">
                AI Attention Heatmap
              </p>

            </div>

            {heatmapImage ? (

              <img
                src={heatmapImage}
                alt="Heatmap"
                className="
                  w-full
                  h-[420px]
                  object-contain
                  bg-black
                "
              />

            ) : (

              <div className="
                h-[420px]
                flex
                items-center
                justify-center
                text-zinc-600
                text-sm
              ">
                No Heatmap Available
              </div>

            )}

          </div>

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
            src={pdfUrl}
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