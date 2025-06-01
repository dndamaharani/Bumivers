// src/Pages/DashboardPage.tsx - Fixed API Integration
import { useState, useMemo } from "react";
import MainLayout from "../components/MainLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { UserIcon, TrophyIcon, CalendarIcon, RefreshCw } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { userActionService, type UserAction, type LeaderboardUser } from "../services/userActionService";

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("Semua");
  const [selectedUser, setSelectedUser] = useState("Saya");

  // Fetch user actions from API
  const { data: userActions, loading: actionsLoading, error: actionsError, refetch: refetchActions } = useApi<UserAction[]>(
    () => userActionService.getUserActions()
  );

  // Fetch leaderboard from API
  const { data: leaderboardData, loading: leaderboardLoading, error: leaderboardError, refetch: refetchLeaderboard } = useApi<LeaderboardUser[]>(
    () => userActionService.getLeaderboard()
  );

  // Calculate derived data
  const { 
    uniqueMonths, 
    filteredActions, 
    chartData, 
    totalPoin, 
    getBadge,
    currentUsername 
  } = useMemo(() => {
    if (!userActions) return {
      uniqueMonths: [],
      filteredActions: [],
      chartData: [],
      totalPoin: 0,
      getBadge: () => "🌏 Pemula Hijau",
      currentUsername: "User"
    };

    // Get current user info
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUsername = currentUser.username || "User";

    // Calculate unique months
    const uniqueMonths = Array.from(
      new Set(
        userActions.map((action) =>
          new Date(action.createdAt).toLocaleString("id-ID", {
            month: "long",
            year: "numeric",
          })
        )
      )
    );

    // Filter actions based on selected month
    const filteredActions = userActions.filter((action) => {
      const monthMatch =
        selectedMonth === "Semua" ||
        new Date(action.createdAt).toLocaleString("id-ID", {
          month: "long",
          year: "numeric",
        }) === selectedMonth;

      const userMatch = selectedUser === "Saya"; // Only show current user's actions

      return monthMatch && userMatch;
    });

    // Create chart data
    const chartData = filteredActions.reduce((acc, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString("id-ID");
      const existing = acc.find((d) => d.date === date);
      if (existing) {
        existing.poin += curr.points;
      } else {
        acc.push({ date, poin: curr.points });
      }
      return acc;
    }, [] as { date: string; poin: number }[]);

    // Calculate total points
    const totalPoin = userActions.reduce((sum, action) => sum + action.points, 0);

    // Badge calculation function
    const getBadge = (poin: number) => {
      if (poin >= 100) return "🌟 Eco Hero";
      if (poin >= 50) return "🌿 Green Guardian";
      if (poin >= 25) return "🌱 Earth Supporter";
      return "🌏 Pemula Hijau";
    };

    return {
      uniqueMonths,
      filteredActions,
      chartData,
      totalPoin,
      getBadge,
      currentUsername
    };
  }, [userActions, selectedMonth, selectedUser]);

  const handleRefresh = () => {
    refetchActions();
    refetchLeaderboard();
  };

  return (
    <MainLayout>
      <section className="min-h-screen px-6 py-20 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-green-700 dark:text-green-300">
              🌿 Dashboard Bumiverse
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
              Pantau progres hijau kamu, {currentUsername}! 🌍
            </p>
            <button
              onClick={handleRefresh}
              disabled={actionsLoading || leaderboardLoading}
              className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
            >
              <RefreshCw className={`w-4 h-4 ${(actionsLoading || leaderboardLoading) ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>

          {/* Loading State */}
          {(actionsLoading || leaderboardLoading) && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="ml-4 text-gray-600 dark:text-gray-300">Memuat data dashboard...</span>
            </div>
          )}

          {/* Error States */}
          {(actionsError || leaderboardError) && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
              <div className="text-red-700 dark:text-red-200">
                <p className="font-medium">⚠️ Error memuat data dashboard</p>
                {actionsError && <p className="text-sm mt-1">Actions: {actionsError}</p>}
                {leaderboardError && <p className="text-sm mt-1">Leaderboard: {leaderboardError}</p>}
              </div>
            </div>
          )}

          {/* Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white">
                <CalendarIcon size={18} /> Bulan
              </label>
              <select
                className="w-full mt-2 p-2 rounded border dark:bg-gray-700 dark:text-white"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="Semua">🌍 Semua Bulan</option>
                {uniqueMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white">
                <UserIcon size={18} /> Tampilan
              </label>
              <select
                className="w-full mt-2 p-2 rounded border dark:bg-gray-700 dark:text-white"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="Saya">🙋‍♂️ Data Saya</option>
              </select>
            </div>
          </div>

          {/* Badge & Total Points */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow text-center space-y-2">
            <p className="text-xl text-gray-800 dark:text-gray-100">
              Total Poin Anda:
              <span className="text-3xl text-green-600 font-bold ml-2">
                {totalPoin}
              </span>
            </p>
            <p className="text-lg font-medium text-green-700 dark:text-green-300">
              🎖️ Badge: {getBadge(totalPoin)}
            </p>
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalPoin / 100) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {Math.min(totalPoin, 100)}/100 poin untuk badge berikutnya
            </p>
          </div>

          {/* Chart & Leaderboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300">
                📊 Histogram Progres Poin
              </h2>
              {chartData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {actionsLoading ? "Memuat data chart..." : "Belum ada data untuk grafik."}
                  </p>
                  {!actionsLoading && (
                    <button 
                      onClick={() => window.location.href = "/aksi"}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      Mulai Beraksi 🌱
                    </button>
                  )}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                    barCategoryGap={20}
                  >
                    <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#166534", fontWeight: "bold" }}
                    />
                    <Bar
                      dataKey="poin"
                      radius={[8, 8, 0, 0]}
                      fill="url(#colorPoin)"
                      animationDuration={1000}
                    >
                      <LabelList
                        dataKey="poin"
                        position="top"
                        fill="#065f46"
                        fontSize={13}
                        fontWeight={600}
                      />
                    </Bar>
                    <defs>
                      <linearGradient id="colorPoin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0.9} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Leaderboard */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-green-700 dark:text-green-300">
                <TrophyIcon size={18} /> Papan Peringkat
              </h2>
              {leaderboardLoading ? (
                <div className="text-center py-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Memuat leaderboard...</p>
                </div>
              ) : leaderboardError ? (
                <div className="text-center py-6">
                  <p className="text-sm text-red-600 dark:text-red-400">Gagal memuat leaderboard</p>
                </div>
              ) : leaderboardData && leaderboardData.length > 0 ? (
                <ul className="space-y-3 mt-3">
                  {leaderboardData.slice(0, 10).map((entry, index) => (
                    <li
                      key={entry._id}
                      className={`flex items-center justify-between p-3 rounded shadow-sm ${
                        entry.username === currentUsername
                          ? "bg-green-100 dark:bg-green-900 border-2 border-green-300"
                          : "bg-green-50 dark:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 text-xs font-bold">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                        </span>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-white text-sm">
                            {entry.username}
                            {entry.username === currentUsername && " (Anda)"}
                          </span>
                        </div>
                      </div>
                      <span className="text-green-700 dark:text-green-300 font-bold text-sm">
                        {entry.totalPoints} pts
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center py-6">
                  Belum ada data leaderboard.
                </p>
              )}
            </div>
          </div>

          {/* Action History */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4">
              📜 Riwayat Aksi Hijau
            </h2>
            {actionsLoading ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Memuat riwayat...</p>
              </div>
            ) : filteredActions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {actionsError ? "Gagal memuat riwayat aksi" : "Belum ada riwayat aksi untuk periode ini."}
                </p>
                <button
                  onClick={() => window.location.href = "/aksi"}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  Mulai Beraksi 🌱
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredActions
                  .slice()
                  .reverse()
                  .slice(0, 10)
                  .map((action, index) => (
                    <li
                      key={action._id || index}
                      className="flex justify-between items-center py-3"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{action.label}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full">
                            {action.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(action.createdAt).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      <span className="text-green-600 font-bold">+{action.points} pts</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Action Buttons */}
          <div className="text-center pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = "/aksi"}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition text-lg font-medium"
              >
                🌱 Tambah Aksi Baru
              </button>
              <button
                onClick={handleRefresh}
                disabled={actionsLoading || leaderboardLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition text-lg font-medium disabled:opacity-50"
              >
                {(actionsLoading || leaderboardLoading) ? "🔄 Memuat..." : "🔄 Refresh Data"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}