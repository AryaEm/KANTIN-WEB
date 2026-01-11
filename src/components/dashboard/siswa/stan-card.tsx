import { Stan } from '@/app/types'
import { Store } from 'lucide-react'

type Props = {
  stan: Stan
  onClick: () => void
}

export default function StanCard({ stan, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-white/10 bg-white/5 p-6 text-left hover:border-teal-400 transition"
    >
      <div className="mb-4 h-12 w-12 rounded-md bg-[#114744] flex items-center justify-center border border-teal-300/50">
        <Store className="text-teal-500" />
      </div>

      <h3 className="text-lg mb-2 font-semibold">{stan.name}</h3>
      <p className="text-sm text-white/60">Pemilik: {stan.owner}</p>
      <p className="text-sm text-white/60">Telp: {stan.telp}</p>
    </button>
  )
}
