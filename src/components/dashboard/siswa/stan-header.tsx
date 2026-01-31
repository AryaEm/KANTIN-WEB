import { Store, Star, MapPin, Clock, Phone } from "lucide-react"

type Props = {
  name: string
  owner: string
}

export default function StanHeader({ name, owner }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 rounded-3xl p-8 border-2 border-orange-400 shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-700 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
          <div className="relative">
            <div className="p-5 bg-white rounded-2xl shadow-xl">
              <Store className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl Fredoka font-black text-white mb-2 leading-tight">
              {name}
            </h2>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-orange-100 flex items-center justify-center font-bold text-orange-600 text-lg border-2 border-white">
                {owner.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white/70 text-xs font-semibold mb-1">Dikelola oleh</p>
                <p className="text-white text-lg font-bold">{owner}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}