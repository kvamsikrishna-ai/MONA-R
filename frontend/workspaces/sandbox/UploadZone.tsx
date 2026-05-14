interface Props {

  onUpload:
    (
      file: File
    ) => void
}

export default function
UploadZone({

  onUpload,

}: Props) {

  function handleChange(
    event:
    React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0]

    if (!file) return

    onUpload(file)
  }

  return (

    <div className="
      border-2
      border-dashed
      border-zinc-700
      rounded-3xl
      p-12
      text-center
      bg-zinc-950
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Upload Scan
      </h2>

      <p className="
        text-zinc-500
        mb-8
      ">
        Drop DICOM or PNG
        chest scans here.
      </p>

      <input
        type="file"
        accept=".png,.jpg,.jpeg,.dcm"
        onChange={handleChange}
        className="
          block
          mx-auto
          text-zinc-400
        "
      />

    </div>
  )
}