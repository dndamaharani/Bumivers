import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Award, TrendingUp, Calendar } from "lucide-react";
import MainLayout from "../components/MainLayout";
import { useApi } from "../hooks/useApi";
import { userActionService, type UserAction } from "../services/userActionService";

const UserDashboard: React.FC = () => {
  // Get current user from localStorage (set during login)
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  
  // Fetch user actions from API
  const { data: userActions, loading, error, refetch } = useApi<UserAction[]>(
    () => userActionService.getUserActions()
  );

  // Calculate user stats
  const totalPoints = userActions?.reduce((sum, action) => sum + action.points, 0) || 0;
  const totalActions = userActions?.length || 0;
  const recentActions = userActions?.slice(-5).reverse() || [];

  // Badge calculation
  const getBadge = (points: number) => {
    if (points >= 100) return { name: "🌟 Eco Hero", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (points >= 50) return { name: "🌿 Green Guardian", color: "text-green-600", bg: "bg-green-100" };
    if (points >= 25) return { name: "🌱 Earth Supporter", color: "text-lime-600", bg: "bg-lime-100" };
    return { name: "🌏 Pemula Hijau", color: "text-blue-600", bg: "bg-blue-100" };
  };

  const currentBadge = getBadge(totalPoints);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Pengguna
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Selamat datang kembali, mari lihat progres hijau Anda! 🌱
            </p>
          </motion.div>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {currentUser.username || "Pengguna"}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>{currentUser.email || "user@example.com"}</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${currentBadge.bg} ${currentBadge.color} font-medium`}>
                  <Award className="w-4 h-4" />
                  {currentBadge.name}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {totalPoints}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Poin
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalActions}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Aksi
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalPoints >= 100 ? "4" : totalPoints >= 50 ? "3" : totalPoints >= 25 ? "2" : "1"}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Badge Level
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {new Date(currentUser.createdAt || Date.now()).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Bergabung
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🌱 Aksi Terbaru
            </h3>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <span className="ml-4 text-gray-600 dark:text-gray-300">Memuat aksi terbaru...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">Gagal memuat data: {error}</p>
                <button 
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Coba Lagi
                </button>
              </div>
            ) : recentActions.length > 0 ? (
              <div className="space-y-4">
                {recentActions.map((action, index) => (
                  <div
                    key={action._id || index}
                    className="flex items-center justify-between p-4 bg-green-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {action.label}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full">
                          {action.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(action.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                    <span className="text-green-600 font-bold">
                      +{action.points} pts
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Belum ada aksi yang tercatat. Mulai berkontribusi untuk bumi!
                </p>
                <Link
                  to="/aksi"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Mulai Beraksi 🌱
                </Link>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition text-center"
            >
              📊 Dashboard Lengkap
            </Link>
            <Link
              to="/aksi"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition text-center"
            >
              🌱 Tambah Aksi Baru
            </Link>
            <Link
              to="/artikel"
              className="px-6 py-3 border border-green-600 text-green-700 hover:bg-green-50 dark:hover:bg-gray-700 font-semibold rounded-full transition text-center"
            >
              📖 Baca Artikel
            </Link>
          </motion.div>

          {/* User Role Badge */}
          <div className="text-center mt-8">
            <span className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
              Role: {currentUser.role || "user"}
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;