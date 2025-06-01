// src/Pages/KategoriDetailPage.tsx - Fixed API Integration
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, Quote, Zap } from "lucide-react";
import MainLayout from "../components/MainLayout";
import { useApi } from "../hooks/useApi";
import { categoryService, type Category } from "../services/categoryService";

const KategoriDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch single category from API
  const { data: category, loading, error } = useApi<Category>(
    () => categoryService.getCategory(id!),
    [id]
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-green-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Memuat kategori...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !category) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-green-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Kategori Tidak Ditemukan</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error || "Kategori yang Anda cari tidak ditemukan."}
            </p>
            <button
              onClick={() => navigate("/kategori")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Kategori
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-green-50 dark:bg-gray-900 pt-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-green-800 dark:text-green-300">
                {category.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dipublikasikan: {new Date(category.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-100 dark:bg-gray-700 p-4 rounded-lg"
          >
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-200 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              🌟 Fun Fact
            </h2>
            <p className="text-gray-800 dark:text-gray-100">{category.funFact}</p>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-100 dark:bg-gray-700 p-4 rounded-lg"
          >
            <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              💡 Tips Praktis
            </h2>
            <p className="text-gray-800 dark:text-gray-100">{category.tips}</p>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-100 dark:bg-gray-700 p-4 rounded-lg"
          >
            <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              💬 Quote Inspiratif
            </h2>
            <p className="italic text-gray-700 dark:text-gray-200">
              {category.quote}
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg text-center"
          >
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
              🌱 Siap Memulai Aksi?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Jadilah bagian dari perubahan dengan memulai aksi ramah lingkungan hari ini!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/aksi")}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
              >
                🌿 Mulai Beraksi
              </button>
              <button
                onClick={() => navigate("/artikel")}
                className="px-6 py-2 border border-green-600 text-green-700 hover:bg-green-50 dark:hover:bg-gray-600 rounded-lg transition duration-200"
              >
                📖 Baca Artikel
              </button>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => navigate("/kategori")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Kategori
            </button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default KategoriDetailPage;