import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import articlesData from "../data/Articles";
import ArticleCard from "../components/ArticleCard";
import { AnimatePresence, motion } from "framer-motion";

const categories = ["Semua", ...Array.from(new Set(articlesData.map(a => a.category)))];

export default function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const articlesPerPage = 6;

  useEffect(() => {
    setCurrentPage(1); // Reset halaman saat kategori atau pencarian berubah
  }, [selectedCategory, searchTerm]);

  const filteredArticles = articlesData.filter(article => {
    const matchCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="px-4 py-16 bg-green-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 dark:text-green-200 mb-8">
          📚 Artikel Edukasi
        </h2>

        {/* Input Pencarian */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Cari artikel"
            role="searchbox"
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Tombol Kategori */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === category
                  ? "bg-green-600 text-white shadow-md ring-2 ring-green-300"
                  : "bg-white dark:bg-gray-700 text-green-700 dark:text-green-200 border border-green-300 dark:border-gray-600"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {paginatedArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ArticleCard
                  {...article}
                  onClick={() => navigate(`/artikel/${article.id}`)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-white hover:bg-gray-100 disabled:opacity-50"
            >
              ← Sebelumnya
            </button>
            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white"
                  } hover:bg-green-100`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-white hover:bg-gray-100 disabled:opacity-50"
            >
              Selanjutnya →
            </button>
          </div>
        )}

        {/* Pesan Tidak Ada Hasil */}
        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8 italic">
            Tidak ditemukan artikel yang cocok 🌿
          </p>
        )}
      </div>
    </section>
  );
}
