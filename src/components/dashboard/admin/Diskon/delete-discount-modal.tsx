"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";

type DelMenuModalProps = {
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
};

export default function DelDiscountModal({
  onClose,
  onSubmit,
}: DelMenuModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/15 backdrop-blur w-full max-w-md rounded-3xl p-8 border-2 border-red-500 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-red-500 to-rose-500 rounded-full">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl Fredoka tracking-wide font-bold text-white mb-3">
            Hapus Diskon?
          </h2>
          <p className="text-white/80 font-medium">
            Yakin ingin menghapus diskon ini? Tindakan ini tidak dapat dibatalkan dan data diskon akan hilang permanen.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-sm font-bold text-white/50 hover:text-white hover:bg-white/20 border-2 border-white/50 rounded-xl transition-all"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Trash2 size={18} />
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}