import { Stan } from '@/app/types'

export const stans: Stan[] = [
  {
    id: 1,
    name: 'Warung Bu Siti',
    owner: 'Siti Aminah',
    phone: '081234567890',
    menus: [
      {
        id: 1,
        name: 'Nasi Goreng Spesial',
        category: 'makanan',
        description: 'Nasi goreng dengan telur dan ayam',
        price: 15000,
        discount: 10,
      },
      {
        id: 2,
        name: 'Mie Ayam Bakso',
        category: 'makanan',
        description: 'Mie ayam dengan bakso sapi',
        price: 12000,
      },
      {
        id: 3,
        name: 'Es Teh Manis',
        category: 'minuman',
        description: 'Teh manis dingin segar',
        price: 5000,
      },
    ],
  },
  {
    id: 2,
    name: 'Kantin Pak Joko',
    owner: 'Joko Widodo',
    phone: '081234567891',
    menus: [],
  },
  {
    id: 3,
    name: 'Es Teh Manis',
    owner: 'Rina Melati',
    phone: '081234567892',
    menus: [],
  },
]
