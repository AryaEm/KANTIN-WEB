"use client";

type DelMenuModalProps = {
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
};

export default function DelDiscountModal({
  onClose,
  onSubmit,
}: DelMenuModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md border border-red-400/50 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-3">
          Hapus Discount
        </h2>

        <p className="text-sm text-white/70 mb-6">
          Yakin ingin menghapus diskon ini?
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm bg-white/10 text-white hover:bg-white/20"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-lg text-sm bg-red-500 text-black hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
