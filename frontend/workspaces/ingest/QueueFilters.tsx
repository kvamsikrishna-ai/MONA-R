export default function
QueueFilters() {

  return (

    <div className="
      flex
      items-center
      gap-4
      bg-zinc-950
      border
      border-zinc-800
      rounded-2xl
      p-4
    ">

      <button className="
        px-4
        py-2
        rounded-xl
        bg-cyan-500
        text-black
        font-medium
      ">

        All Cases

      </button>

      <button className="
        px-4
        py-2
        rounded-xl
        bg-zinc-900
        text-zinc-300
      ">

        High Priority

      </button>

      <button className="
        px-4
        py-2
        rounded-xl
        bg-zinc-900
        text-zinc-300
      ">

        Normal

      </button>

    </div>
  )
}