"use client";

import { Trash2, AlertTriangle } from "lucide-react";

type DelMenuModalProps = {
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
};

export default function DelMenuModal({
  onClose,
  onSubmit,
}: DelMenuModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white/15 backdrop-blur rounded-3xl p-8 w-full max-w-md shadow-2xl border-2 border-red-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-100 rounded-2xl">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl Fredoka tracking-wide font-bold text-white">
              Hapus Menu
            </h2>
            <p className="text-sm text-white/65">Tindakan ini tidak dapat dibatalkan</p>
          </div>
        </div>

        <div className="bg-red-500/15 border-2 border-red-500 rounded-2xl p-4 mb-6">
          <p className="text-white/90 font-medium">
            Yakin ingin menghapus menu ini? Data menu akan hilang permanen dan tidak bisa dikembalikan.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-white/60 font-bold bg-white/5 hover:bg-white hover:text-black border-2 border-white/15 rounded-xl transition-all"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}