import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface HistoryItem {
  label: string;
  point: number;
  date: string; // Format: "05 Apr 2025 08:30"
  category: string;
}

interface GreenHistoryProps {
  data: HistoryItem[];
}

export default function GreenHistory({ data }: GreenHistoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const safeData = data.map((item) => ({
    ...item,
    category: item.category || "Umum",
  }));

  const categories = ["Semua", ...new Set(safeData.map((item) => item.category))];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toISOString().split("T")[0];
  };

  const filteredData = safeData.filter((item) => {
    const matchCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchDate = !selectedDate || formatDate(item.date) === selectedDate;
    return matchCategory && matchDate;
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-12 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        📝 Riwayat Aksi
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-xl border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-xl border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <AnimatePresence mode="wait">
        {filteredData.length === 0 ? (
          <motion.p
            key="no-data"
            className="text-gray-500 text-center italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Tidak ada aksi sesuai filter. Yuk tambah aksi hijau! 🌱
          </motion.p>
        ) : (
          <motion.ul
            key="data-list"
            className="divide-y divide-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredData.map((item, idx) => (
              <motion.li
                key={idx}
                className="py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
              >
                <div className="text-green-900 font-medium">{item.label}</div>
                <div className="text-green-600 font-semibold">
                  +{item.point} poin
                </div>
                <div className="text-gray-400 text-sm">{item.date}</div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
