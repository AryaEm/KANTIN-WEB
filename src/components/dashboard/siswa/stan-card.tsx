import { Stan } from '@/app/types'
import { Store, ArrowRight, Phone, User, ChevronRight } from 'lucide-react'

type Props = {
  stan: Stan
  onClick: () => void
}

export default function StanCard({ stan, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group w-full bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-400 p-6 text-left transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Decorative gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon and arrow */}
        <div className="flex justify-between items-start mb-5">
          <div className="relative">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all">
              <Store className="w-7 h-7" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
          </div>

          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-yellow-500 transition-all">
            <ArrowRight className="w-5 h-5 text-orange-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Stan Name */}
        <h3 className="text-xl Fredoka font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {stan.name}
        </h3>

        {/* Info Section */}
        <div className="space-y-2.5">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl group-hover:bg-orange-50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border-2 border-gray-200 group-hover:border-orange-300">
              <User className="w-4 h-4 text-gray-600 group-hover:text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-semibold mb-0.5">Pemilik</p>
              <p className="text-sm text-gray-900 font-bold truncate">{stan.owner}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl group-hover:bg-orange-50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border-2 border-gray-200 group-hover:border-orange-300">
              <Phone className="w-4 h-4 text-gray-600 group-hover:text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-semibold mb-0.5">Telepon</p>
              <p className="text-sm text-gray-900 font-bold truncate">{stan.telp || 'Tidak tersedia'}</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-5 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-semibold group-hover:text-orange-600 transition-colors">
              Lihat Menu
            </span>
            <div className="flex items-center gap-1">
              <ChevronRight size={18} className='text-orange-500'/>
            </div>
          </div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </button>
  )
}