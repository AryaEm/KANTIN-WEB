import { Plus, Tag, SquarePen, Trash2 } from "lucide-react";

type Discount = {
  id: number;
  name: string;
  percent: number;
  startDate: string;
  endDate: string;
};

export default function DiscountView() {
  const discounts: Discount[] = [
    {
      id: 1,
      name: "Diskon Semester",
      percent: 15,
      startDate: "1/1/2024",
      endDate: "30/6/2024",
    },
    {
      id: 2,
      name: "Promo Akhir Bulan",
      percent: 10,
      startDate: "25/1/2024",
      endDate: "31/1/2024",
    },
    {
      id: 3,
      name: "Happy Hour",
      percent: 20,
      startDate: "1/1/2024",
      endDate: "31/12/2024",
    },
  ];

  return (
    <div className="space-y-8 Poppins">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Daftar Diskon</h1>

        <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-black px-5 py-2.5 rounded-xl font-medium">
          <Plus size={20} /> Tambah Diskon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((discount) => (
          <div
            key={discount.id}
            className="card-bg shadow-2xl rounded-2xl p-6 border border-white/15"
          >
            <div className="flex items-center gap-4">
              <div className="bg-teal-500/20 p-3 rounded-xl">
                <Tag className="text-teal-400" size={24} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white mb-px">
                  {discount.name}
                </h2>
                <p className="text-3xl font-bold text-teal-400">
                  {discount.percent}%
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                {discount.startDate} - {discount.endDate}
              </p>

              <div className="flex gap-4">
                <button className="text-white hover:text-teal-400">
                  <SquarePen size={18} />
                </button>
                <button className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-md">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
