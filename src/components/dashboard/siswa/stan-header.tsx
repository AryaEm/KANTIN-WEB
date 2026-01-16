import { Store } from "lucide-react"

type Props = {
  name: string
  owner: string
}

export default function StanHeader({ name, owner }: Props) {
  return (
    <div className="rounded-xl border border-teal-400/70 bg-white/5 p-6 flex gap-4">
      <div className="border border-teal-300/50 flex items-center justify-center bg-[#114744] h-14 w-14 rounded-md">
        <Store className=" text-teal-300" />
      </div>
      <div>
        <h2 className="text-2xl font-medium mb-2">{name}</h2>
        <p className="text-white/60 text-sm">Pemilik: {owner}</p>
      </div>
    </div>
  )
}
