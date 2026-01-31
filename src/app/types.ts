export type Menu = {
  id: number;
  id_stan: number
  name: string;
  jenis_menu: string;
  price: number;
  image?: string | null;
  description: string
  discount?: number;
  status: "tersedia" | "habis";
};

// export type MenuItem = {
//   id: number;
//   nama_menu: string;
//   jenis: "makanan" | "minuman";
//   harga: number;
//   deskripsi: string
//   status: "tersedia" | "habis";
//   foto?: string
// };

export type MenuItem = {
  id: number
  nama_menu: string
  harga: number
  jenis: "makanan" | "minuman";
  status: "tersedia" | "habis"
  deskripsi: string
  diskon?: {
    id: number
    nama_diskon: string
    potongan: number
  } | null
  foto?: string
}

export type Diskon = {
  id: number;
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;
};

export type AdminStanMenu = {
  id: number;
  name: string;
  description: string;
  jenis_menu: "makanan" | "minuman";
  price: number;
  image: string | null;
  status: "tersedia" | "habis";
  discount: number;
  activeDiskonId: number | null;
};


export type DiskonItem = {
  id: number
  nama_diskon: string
  persentase_diskon: number
  tanggal_awal: string
  tanggal_akhir: string
}

export type Stan = {
  id: number;
  name: string;
  owner: string;
  telp: string
};

export interface CartItem {
  stan_id: number
  id_menu: number;
  nama_menu: string;
  foto: string | null
  harga_asli: number;
  harga_setelah_diskon: number;
  diskon_persen: number;

  qty: number;
}


export type StanDetail = Stan & {
  menus: Menu[]
}

export type Discount = {
  id: number;
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;
  status: "aktif" | "belum_aktif" | "expired";
};

export type HistoryItem = {
  id_transaksi: number;
  kode_transaksi: string;
  tanggal: string;
  status: string;

  siswa: {
    nama_siswa: string;
  };

  items: {
    nama_menu: string;
    harga_satuan: number
    diskon_presen: number
    harga_setelah_diskon: number
    qty: number;
    subtotal: number;
  }[];

  total_item: number
  total_harga: number;
};

export type OrderStatus =
  | "belum_dikonfirmasi"
  | "proses"
  | "selesai"
  | "ditolak";

export type OrderItem = {
  id_menu: number;
  nama_menu: string;
  qty: number;
  harga_satuan: number;
  subtotal: number;
};

export type Order = {
  id_transaksi: number;
  kode_transaksi: string;
  tanggal: string;
  status: OrderStatus;
  siswa: {
    nama_siswa: string;
  };
  items: OrderItem[];
  total_harga: number;
}

export interface IMenu {
  id: number;
  name: string;
  description: string;
  jenis_menu: string;
  price: number;
  image: string;
  discount?: number;
}

export interface IStan {
  id: number;
  nama_stan: string;
  nama_pemilik: string;
  telp?: string;
}

export interface IStanDetail extends Stan {
  menus: Menu[];
}

export type HistorySiswa = {
  id_transaksi: number;
  tanggal: string;
  status: OrderStatus;
  stan: {
    nama_stan: string;
  };
  items: {
    nama_menu: string;
    qty: number;
    harga_setelah_diskon: number;
    subtotal: number;
  }[];
  total_harga: number;
};

export type AdminProfileResponse = {
  id: number;
  username: string;
  role: "admin";
  stan?: {
    id: number
    nama_stan: string;
    nama_pemilik: string;
    telp: string;
  } | null;
};

export type SiswaProfileResponse = {
  id: number;
  username: string;
  role: "siswa";
  siswa?: {
    id: number;
    nama_siswa: string;
    telp: string;
    jenis_kelamin: "laki_laki" | "perempuan";
    foto?: string;
  };
};


export type BestSeller = {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  totalTerjual: number;
};