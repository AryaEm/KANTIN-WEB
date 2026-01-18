'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronLeft } from 'lucide-react'

import StanCard from '@/components/dashboard/siswa/stan-card'
import StanHeader from '@/components/dashboard/siswa/stan-header'
import MenuCard from '@/components/dashboard/siswa/menu-card'

import { Stan, StanDetail, Menu } from '@/app/types'
import { BASE_API_URL } from '../../../../global'
import { getCookie } from '@/lib/client-cookie'

interface StanAPI {
  id: number
  nama_stan: string
  nama_pemilik: string
  telp?: string
}

interface MenuAPI {
  id: number
  name: string
  description: string
  jenis_menu: string
  price: number
  image?: string | null
  discount?: number
}

export default function StanPage({
  addToCart,
}: {
  addToCart: (menu: Menu) => void
}) {
  const [stans, setStans] = useState<Stan[]>([])
  const [selectedStan, setSelectedStan] = useState<StanDetail | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = getCookie('token')
    if (!token) return

    axios
      .get(`${BASE_API_URL}/menu/stan`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status) {
          const mapped: Stan[] = res.data.data.map((s: StanAPI) => ({
            id: s.id,
            name: s.nama_stan,
            owner: s.nama_pemilik,
            telp: s.telp || '',
            menus: [],
          }))
          setStans(mapped)
        }
      })
      .catch(console.error)
  }, [])

  const handleSelectStan = async (stanId: number) => {
    const token = getCookie('token')
    if (!token) return

    try {
      setLoading(true)

      const res = await axios.get(`${BASE_API_URL}/menu/stan/${stanId}/menu`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.data.status) {
        const s = res.data.data

        const mapped: StanDetail = {
          id: s.id,
          name: s.name,
          owner: s.owner,
          telp: s.telp || '',
          menus: s.menus.map((m: MenuAPI): Menu => ({
            id: m.id,
            name: m.name,
            description: m.description,
            jenis_menu: m.jenis_menu,
            price: m.price,
            image: m.image ?? '', 
            discount: m.discount,
          })),
        }

        setSelectedStan(mapped)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="text-white Poppins">
      <div className='mb-5 font-semibold text-2xl'>
        Pilih Stan
        <p className='text-white/60 text-sm font-medium tracking-wide'>Temukan stan favoritmu</p>
        </div>
      {!selectedStan ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stans.map((stan) => (
            <StanCard
            key={stan.id}
            stan={stan}
            onClick={() => handleSelectStan(stan.id)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <button
            onClick={() => setSelectedStan(null)}
            className="text-sm text-white/70 hover:text-white flex items-center"
          >
            <ChevronLeft className="mr-2" />
            Kembali ke Daftar Stan
          </button>

          <StanHeader
            name={selectedStan.name}
            owner={selectedStan.owner}
          />

          <h3 className="text-xl font-semibold">Menu Tersedia</h3>

          {loading ? (
            <p className="text-white/50">Memuat menu...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedStan.menus.map((menu) => (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}
