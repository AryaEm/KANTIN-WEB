export interface IGame {
    id: number,
    uuid: string,
    name: string,
    gambar: string,
    video?: string,
    developer?: string,
    harga: number,
    deskripsi: string
    total_dibeli?: number,
    genre: string,
    isOwned?: string,
    tahun_rilis?: string,
    download_link?: string,
    createdAt: string,
    updatedAt: string
}

// interface GameCardProps {
//     game: IGame
//     isLoggedIn: boolean
// }

export interface ICartGameItem {
    id: number
    uuid?: string
    name: string
    harga: number
    genre: string
    gambar: string
    deskripsi: string
    quantity: number
}