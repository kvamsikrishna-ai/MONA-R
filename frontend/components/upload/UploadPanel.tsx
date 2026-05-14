"use client"

interface Props {
  onUpload: (file: File) => void
}

export default function UploadPanel({
  onUpload,
}: Props) {

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0]

    if (!file) return

    onUpload(file)
  }

  return (

    <div className="border rounded-xl p-6 bg-zinc-900 text-white border border-zinc-800 shadow">

      <h2 className="text-xl font-semibold mb-4">
        Upload Chest Scan
      </h2>

      <input
        type="file"
        accept=".png,.jpg,.jpeg,.dcm"
        onChange={handleChange}
      />

    </div>
  )
}