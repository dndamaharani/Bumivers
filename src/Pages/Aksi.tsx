// src/Pages/Aksi.tsx - Fixed API Integration
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { useApi, useMutation } from "../hooks/useApi";
import { userActionService, type UserAction } from "../services/userActionService";

type AksiItem = {
  id: string;
  title: string;
  poin: number;
  category: string;
};

const aksiList: AksiItem[] = [
  { id: "1", title: "Mematikan lampu saat tidak digunakan", poin: 5, category: "Energi" },
  { id: "2", title: "Mengurangi penggunaan plastik sekali pakai", poin: 10, category: "Sampah" },
  { id: "3", title: "Menggunakan transportasi umum", poin: 15, category: "Transportasi" },
  { id: "4", title: "Membawa tas belanja sendiri", poin: 8, category: "Sampah" },
  { id: "5", title: "Mendaur ulang sampah rumah tangga", poin: 12, category: "Sampah" },
  { id: "6", title: "Menghemat air saat mandi atau mencuci", poin: 7, category: "Air" },
  { id: "7", title: "Menanam pohon atau tanaman", poin: 20, category: "Berkebun" },
  { id: "8", title: "Menggunakan botol minum isi ulang", poin: 6, category: "Sampah" },
  { id: "9", title: "Berjalan kaki atau naik sepeda", poin: 9, category: "Transportasi" },
  { id: "10", title: "Menyebarkan edukasi lingkungan ke teman", poin: 13, category: "Edukasi" },
];

export default function Aksi() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [pendingItem, setPendingItem] = useState<AksiItem | null>(null);
  const [totalPoin, setTotalPoin] = useState(0);
  const [notifikasi, setNotifikasi] = useState("");
  const navigate = useNavigate();

  // Fetch user actions from API
  const { data: userActions, loading, error, refetch } = useApi<UserAction[]>(
    () => userActionService.getUserActions()
  );

  // Mutation for adding new user action
  const { mutate: addUserAction, loading: submitting } = useMutation(
    (action: { label: string; points: number; category: string }) => 
      userActionService.addUserAction(action)
  );

  // Calculate total points and checked items from API data
  useEffect(() => {
    if (userActions) {
      const total = userActions.reduce((sum, action) => sum + action.points, 0);
      setTotalPoin(total);
      
      // Mark actions as checked if they exist in user's history
      const completedActionIds = aksiList
        .filter(aksi => 
          userActions.some(userAction => 
            userAction.label === aksi.title
          )
        )
        .map(aksi => aksi.id);
      
      setCheckedItems(completedActionIds);
    }
  }, [userActions]);

  const showNotifikasi = (pesan: string) => {
    setNotifikasi(pesan);
    setTimeout(() => setNotifikasi(""), 3000);
  };

  const handleCheckboxClick = (item: AksiItem) => {
    // Don't allow if already checked
    if (checkedItems.includes(item.id)) {
      return;
    }
    
    // Don't allow if not authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      showNotifikasi("Silakan login terlebih dahulu untuk melakukan aksi!");
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setPendingItem(item);
  };

  const handleConfirm = async (item: AksiItem) => {
    try {
      // Add action via API
      const result = await addUserAction({
        label: item.title,
        points: item.poin,
        category: item.category
      });

      if (result) {
        // Update local state
        setCheckedItems(prev => [...prev, item.id]);
        setTotalPoin(prev => prev + item.poin);
        
        // Refetch user actions to get updated data
        refetch();
        
        showNotifikasi(`Aksi berhasil ditambahkan! +${item.poin} poin 🎉`);
      } else {
        showNotifikasi("Gagal menambahkan aksi. Coba lagi!");
      }
    } catch (error) {
      console.error("Error adding user action:", error);
      showNotifikasi("Terjadi kesalahan. Pastikan Anda sudah login!");
    } finally {
      setPendingItem(null);
    }
  };

  const handleCancel = () => {
    setPendingItem(null);
  };

  return (
    <MainLayout>
      <section className="min-h-screen px-6 py-20 bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-green-700 dark:text-green-300 text-center mb-10"
          >
            🌱 Aksi Ramah Lingkungan
          </motion.h1>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="ml-4 text-gray-600 dark:text-gray-300">Memuat data aksi...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl">
              <p className="font-semibold">⚠️ Gagal memuat data aksi</p>
              <p className="text-sm">{error}</p>
              <button 
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Notification */}
          {notifikasi && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-center rounded-xl shadow-md font-semibold"
            >
              {notifikasi}
            </motion.div>
          )}

          {/* Actions List */}
          <ul className="space-y-6">
            {aksiList.map((item, index) => {
              const isChecked = checkedItems.includes(item.id);
              const isPending = pendingItem?.id === item.id;

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: isChecked ? 1 : 1.02 }}
                  className={`rounded-2xl shadow-md p-5 transition-all duration-300 ${
                    isChecked
                      ? "bg-green-100 dark:bg-green-900 border-2 border-green-300"
                      : "bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <label className="flex items-start space-x-4 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isChecked || submitting}
                        onChange={() => handleCheckboxClick(item)}
                        className="w-5 h-5 accent-green-600 mt-1 disabled:opacity-50"
                      />
                      <div className="flex-1">
                        <span className={`text-lg font-medium ${
                          isChecked 
                            ? "text-green-900 dark:text-green-100 line-through" 
                            : "text-green-900 dark:text-green-100"
                        }`}>
                          {item.title}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full">
                            {item.category}
                          </span>
                          {isChecked && (
                            <span className="text-xs px-2 py-1 bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-full">
                              ✅ Selesai
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                    <span className={`text-green-700 font-bold px-3 py-1 rounded-xl text-sm ${
                      isChecked 
                        ? "bg-green-200 dark:bg-green-800" 
                        : "bg-green-100 dark:bg-green-900"
                    }`}>
                      +{item.poin} pts
                    </span>
                  </div>

                  {/* Confirmation Buttons */}
                  {isPending && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 flex gap-3 justify-end"
                    >
                      <button
                        onClick={() => handleConfirm(item)}
                        disabled={submitting}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-bold shadow transition disabled:opacity-50"
                      >
                        {submitting ? "⏳ Menyimpan..." : "✅ Konfirmasi"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={submitting}
                        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-full text-sm font-bold shadow transition disabled:opacity-50"
                      >
                        ❌ Batal
                      </button>
                    </motion.div>
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* Stats & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 space-y-6"
          >
            {/* Total Points Display */}
            <div className="text-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
              <p className="text-2xl font-extrabold text-green-700 dark:text-green-300 mb-2">
                Total Poin Anda: {totalPoin}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {checkedItems.length} dari {aksiList.length} aksi telah selesai
              </p>
              
              {/* Progress Bar */}
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(checkedItems.length / aksiList.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition duration-300 shadow-lg"
              >
                📊 Lihat Dashboard
              </button>
              <button
                onClick={() => refetch()}
                disabled={loading}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition duration-300 shadow-lg disabled:opacity-50"
              >
                {loading ? "🔄 Memuat..." : "🔄 Refresh Data"}
              </button>
            </div>

            {/* Encouragement Message */}
            {checkedItems.length > 0 && (
              <div className="text-center bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  🎉 Luar biasa! Anda sudah berkontribusi untuk bumi yang lebih hijau!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}