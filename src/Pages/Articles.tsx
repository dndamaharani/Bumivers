// src/Pages/Articles.tsx - Fixed API Integration
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArticleCard from "../components/ArticleCard";
import MainLayout from "../components/MainLayout";
import { useApi } from "../hooks/useApi";
import { articleService, type Article } from "../services/articleService";

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch articles from API
  const { data: articles, loading, error } = useApi<Article[]>(
    () => articleService.getArticles()
  );

  // Get unique categories from articles
  const uniqueCategories = Array.from(new Set(articles?.map((a) => a.category) || []));

  // Filter articles based on search and category
  const filteredArticles = articles?.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <MainLayout>
      <section className="pt-28 pb-16 px-6 bg-white dark:bg-gray-900 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-4">
            Jelajahi Artikel
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Temukan inspirasi dan pengetahuan seputar lingkungan & keberlanjutan 
          </p>
        </motion.div>

        {/* Filter dan Search */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Cari berdasarkan judul..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="all">Semua Kategori</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-300 text-lg">Memuat artikel...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="text-red-500 text-lg mb-4">❌ Gagal memuat artikel</div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Artikel Grid */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <ArticleCard
                  key={article._id}
                  id={article._id}
                  title={article.title}
                  summary={article.summary}
                  image={article.image}
                  category={article.category}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Tidak ada artikel yang ditemukan
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Coba ubah kata kunci pencarian atau kategori
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats */}
        {!loading && !error && articles && (
          <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
            Menampilkan {filteredArticles.length} dari {articles.length} artikel
          </div>
        )}
      </section>
    </MainLayout>
  );
}