'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronLeft, Filter, Search, Store as StoreIcon, Sparkles, X } from 'lucide-react'

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
  status: "tersedia" | "habis";
  image?: string | null
  discount?: number
}

export default function StanPage({
  addToCart,
  cart,
  updateCartQuantity,
}: {
  addToCart: (menu: Menu) => void;
  cart: Array<{ id_menu: number; qty: number }>;
  updateCartQuantity: (menuId: number, newQty: number) => void;
}) {
  const [stans, setStans] = useState<Stan[]>([])
  const [selectedStan, setSelectedStan] = useState<StanDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterJenis, setFilterJenis] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [filterDiskon, setFilterDiskon] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)

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

  const handleSelectStan = async (
    stanId: number,
    filters?: {
      jenis?: string
      status?: string
      diskon?: string
    }
  ) => {
    const token = getCookie('token')
    if (!token) return

    try {
      setLoading(true)

      const res = await axios.get(
        `${BASE_API_URL}/menu/stan/${stanId}/menu`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: filters,
        }
      )

      if (res.data.status) {
        const s = res.data.data

        const mapped: StanDetail = {
          id: s.id,
          name: s.name,
          owner: s.owner,
          telp: s.telp || '',
          menus: s.menus.map((m: MenuAPI): Menu => ({
            id: m.id,
            id_stan: s.id,
            name: m.name,
            description: m.description,
            jenis_menu: m.jenis_menu,
            status: m.status,
            price: m.price,
            image: m.image ?? '',
            discount: m.discount,
          }))
        }

        setSelectedStan(mapped)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!selectedStan) return

    handleSelectStan(selectedStan.id, {
      jenis: filterJenis || undefined,
      status: filterStatus || undefined,
      diskon: filterDiskon || undefined,
    })
  }, [filterJenis, filterStatus, filterDiskon])

  const filteredStans = stans.filter(stan =>
    stan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stan.owner.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredMenus = selectedStan?.menus.filter(menu =>
    menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const clearFilters = () => {
    setFilterJenis("")
    setFilterStatus("")
    setFilterDiskon("")
  }

  const activeFiltersCount = [filterJenis, filterStatus, filterDiskon].filter(Boolean).length

  // Helper function to get cart quantity for a menu
  const getCartQuantity = (menuId: number) => {
    const cartItem = cart.find(item => item.id_menu === menuId);
    return cartItem?.qty || 0;
  };

  return (
    <main className="Poppins">
      {!selectedStan ? (
        <>
          {/* Stan List View */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl Fredoka font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                    <StoreIcon className="w-6 h-6 text-white" />
                  </div>
                  Pilih Stan Favorit
                </h2>
                <p className='text-gray-600 font-medium flex items-center gap-2'>
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  {filteredStans.length} stan tersedia untuk Anda
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari stan atau pemilik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>

            {/* Stan Grid */}
            {filteredStans.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-200">
                <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                  <StoreIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-semibold text-lg">Tidak ada stan ditemukan</p>
                <p className="text-gray-500 text-sm mt-1">Coba kata kunci lain</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStans.map((stan) => (
                  <StanCard
                    key={stan.id}
                    stan={stan}
                    onClick={() => {
                      handleSelectStan(stan.id)
                      setSearchQuery("")
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Menu Detail View */}
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedStan(null)
                clearFilters()
                setSearchQuery("")
              }}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-gray-700 hover:text-orange-600 bg-white border-2 border-gray-200 hover:border-orange-400 rounded-xl transition-all hover:scale-105 shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Daftar Stan
            </button>

            {/* Stan Header */}
            <StanHeader
              name={selectedStan.name}
              owner={selectedStan.owner}
            />

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all border-2 ${
                    showFilters || activeFiltersCount > 0
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-orange-400'
                  }`}
                >
                  <Filter className="w-5 h-5" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-white text-orange-600 text-xs font-bold flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t-2 border-gray-100">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <select
                      value={filterJenis}
                      onChange={(e) => setFilterJenis(e.target.value)}
                      className="px-4 py-2.5 bg-gray-50 text-gray-700 border-2 border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300 transition">
                      <option value="">🍽️ Semua Jenis</option>
                      <option value="makanan">🍕 Makanan</option>
                      <option value="minuman">🥤 Minuman</option>
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2.5 bg-gray-50 text-gray-700 border-2 border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300 transition">
                      <option value="">📊 Semua Status</option>
                      <option value="tersedia">✅ Tersedia</option>
                      <option value="habis">❌ Habis</option>
                    </select>

                    <select
                      value={filterDiskon}
                      onChange={(e) => setFilterDiskon(e.target.value)}
                      className="px-4 py-2.5 bg-gray-50 text-gray-700 border-2 border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300 transition">
                      <option value="">🏷️ Semua Promo</option>
                      <option value="true">🎉 Ada Diskon</option>
                      <option value="false">💰 Harga Normal</option>
                    </select>
                  </div>

                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Reset Filter
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Menu Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-semibold">Memuat menu lezat...</p>
              </div>
            ) : filteredMenus.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-200">
                <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-gray-700 font-bold text-lg mb-2">Tidak ada menu ditemukan</p>
                <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 font-semibold">
                    Menampilkan <span className="text-orange-600 font-bold">{filteredMenus.length}</span> menu
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMenus.map((menu) => (
                    <MenuCard
                      key={menu.id}
                      menu={menu}
                      cartQuantity={getCartQuantity(menu.id)}
                      onAddToCart={addToCart}
                      onUpdateQuantity={updateCartQuantity}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </main>
  )
}