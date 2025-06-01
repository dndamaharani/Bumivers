import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { useApi } from "../hooks/useApi";
import { categoryService, type Category } from "../services/categoryService";

export default function KategoriPage() {
  const navigate = useNavigate();

  // Fetch categories from API
  const { data: categories, loading, error } = useApi<Category[]>(
    () => categoryService.getCategories()
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-green-50 dark:bg-gray-900 pt-32 px-4">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-2"
          >
            Pilih Kategori Aksi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 dark:text-gray-300"
          >
            Temukan berbagai aksi hijau berdasarkan kategori pilihanmu!
          </motion.p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-300 text-lg">Memuat kategori...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="text-red-500 text-lg mb-4">❌ Gagal memuat kategori</div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/kategori/${category._id}`)}
                  className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center text-center"
                >
                  <div className="text-4xl mb-3">
                    {category.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-green-800 dark:text-green-200">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                    {category.description}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Belum ada kategori
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Kategori aksi akan segera tersedia!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {!loading && !error && categories && categories.length > 0 && (
          <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
            Tersedia {categories.length} kategori aksi
          </div>
        )}
      </div>
    </MainLayout>
  );
}