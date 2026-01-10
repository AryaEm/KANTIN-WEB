"use client"

import { ReactNode } from "react"

const EditModal = ({ children, isShow, onClose }: { children: ReactNode, isShow: boolean, onClose: (status: boolean) => void }) => {


    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose(false)
    }
    return (
        <div className={`w-full h-dvh z-[1024] bg-slate-800 bg-opacity-90 backdrop-blur-md fixed top-0 left-0 ${isShow ? `flex` : `hidden`} justify-center items-center`}
            onClick={handleClickOutside}>
            <div className="[30%] h-[20%] overflow-auto max-h-full bg-white rounded-2xl">
                {children}
            </div>
        </div>
    )
}
export default EditModal