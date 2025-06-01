import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const badges = [
  { name: "Pemula Hijau", threshold: 10, description: "Mulai aksi pertamamu!", icon: "🌱" },
  { name: "Pahlawan Lingkungan", threshold: 100, description: "Kumpulkan 100 poin!", icon: "🌿" },
  { name: "Bumi Terjaga", threshold: 200, description: "Dapatkan semua badge!", icon: "🌏" },
];

type AksiHistoryItem = {
  id: string;
  title: string;
  poin: number;
  timestamp: string;
};

export default function Dashboard() {
  const [totalPoin, setTotalPoin] = useState(0);
  const [history, setHistory] = useState<AksiHistoryItem[]>([]);
  const [filterMonth, setFilterMonth] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedPoin = localStorage.getItem("userPoin");
    const savedHistory = localStorage.getItem("aksiLog");
    if (savedPoin) setTotalPoin(Number(savedPoin));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const earnedBadges = badges.filter((badge) => totalPoin >= badge.threshold);

  const chartData = history.reduce((acc: any[], item) => {
    const date = new Date(item.timestamp).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const existing = acc.find((d) => d.date === date);
    if (existing) {
      existing.poin += item.poin;
    } else {
      acc.push({ date, poin: item.poin });
    }
    return acc;
  }, []);

  const uniqueMonths = Array.from(
    new Set(
      history.map((item) => {
        const date = new Date(item.timestamp);
        return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
      })
    )
  );

  const filteredHistory = filterMonth
    ? history.filter((item) => {
        const date = new Date(item.timestamp);
        const monthYear = date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
        return monthYear === filterMonth;
      })
    : history;

  const sortedHistory = [...filteredHistory]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10); // Tampilkan hanya 10 aksi terakhir

  return (
    <MainLayout>
      <section className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 text-center mb-6">
            Dashboard Pribadi
          </h1>

          <div className="bg-green-100 dark:bg-green-900 p-6 rounded-xl shadow text-center text-green-800 dark:text-green-200 mb-6">
            <p className="text-xl font-semibold">Total Poin Aksi Lingkungan:</p>
            <p className="text-4xl font-bold mt-2">{totalPoin}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">Grafik Perkembangan Poin</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="poin" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-green-700 dark:text-green-300">Filter Bulan:</label>
            <select
              className="p-2 rounded border w-full dark:bg-gray-800 dark:text-white"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="">Semua</option>
              {uniqueMonths.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">
              Riwayat Aksi yang Sudah Dilakukan
            </h2>
            {sortedHistory.length > 0 ? (
              <ul className="space-y-3">
                {sortedHistory.map((aksi, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-green-50 dark:bg-gray-700 p-3 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold">{aksi.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{aksi.timestamp}</p>
                    </div>
                    <span className="text-green-600 font-semibold">+{aksi.poin} poin</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">Belum ada aksi untuk bulan ini.</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">Badge Keberlanjutan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {earnedBadges.map((badge, idx) => (
                <div key={idx} className="bg-green-100 p-4 rounded-xl text-center shadow-sm">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h3 className="font-bold text-green-700">{badge.name}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center mb-12">
            <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">Profil Pengguna</h2>
            <p className="text-gray-700 dark:text-gray-300">Fitur ini akan segera hadir!</p>
          </div>

          {/* Tombol Kembali ke Aksi & Lihat Poin */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/aksi")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition"
            >
              ← Kembali ke Aksi 
            </button>
            <button
              onClick={() => alert(`Total Poin Anda: ${totalPoin}`)}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition"
            >
               Lihat Poin
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
