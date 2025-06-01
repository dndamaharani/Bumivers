// src/Pages/Home.tsx - Fixed API Integration
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useApi } from "../hooks/useApi";
import { articleService, type Article } from "../services/articleService";

export default function Home() {
  // Fetch latest articles from API
  const { data: articles, loading, error } = useApi<Article[]>(
    () => articleService.getArticles({ limit: 3 })
  );

  const latestArticles = articles || [];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#e6f4ea] via-[#f3faf4] to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-300 mb-4"
        >
          Bersama Kita Bisa Menjaga Bumi 
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-700 dark:text-gray-300 max-w-2xl text-lg mb-6"
        >
          Edukasi, aksi nyata, dan komunitas peduli lingkungan. Mulailah perjalanan hijaumu bersama kami!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/artikel"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition"
          >
            Baca Artikel
          </Link>
          <Link
            to="/edukasi"
            className="border border-green-600 text-green-700 hover:bg-green-100 px-6 py-3 rounded-full transition"
          >
            Mulai Belajar
          </Link>
        </motion.div>
      </section>

      {/* Highlight Fitur */}
      <section className="bg-[#f3faf4] dark:bg-gray-900 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">Apa yang Kamu Dapatkan?</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Platform Hijau Bumi menyediakan fitur-fitur menarik untuk mendukung gaya hidup berkelanjutan.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto list-none p-0">
          {[
            {
              title: "Artikel Edukatif",
              desc: "Baca berbagai artikel tentang lingkungan & gaya hidup hijau.",
              icon: "📘",
              link: "/edukasi",
            },
            {
              title: "Aksi Ramah Lingkungan",
              desc: "Ikuti aksi nyata dan kumpulkan poin hijau.",
              icon: "🌱",
              link: "/aksi",
            },
            {
              title: "Dashboard Pribadi",
              desc: "Pantau perkembanganmu dan raih badge keberlanjutan.",
              icon: "🏆",
              link: "/dashboard",
            },
          ].map((item, i) => (
            <li key={i}>
              <Link to={item.link}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-green-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-md transition cursor-pointer"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg text-green-700 dark:text-green-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Berita Terbaru */}
      <section className="bg-green-100 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">Berita Terbaru</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tetap update dengan informasi dan kabar terkini seputar lingkungan.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-4 text-gray-600">Memuat artikel terbaru...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Gagal memuat artikel: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {latestArticles.length > 0 ? (
              latestArticles.map((article: Article) => (
                <Link
                  to={`/artikel/${article._id}`}
                  key={article._id}
                  className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="rounded-md h-40 w-full object-cover mb-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/default-article.jpg';
                    }}
                  />
                  <h3 className="font-semibold text-lg text-green-700 dark:text-green-200 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{article.summary}</p>
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    {article.category}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">Belum ada artikel tersedia.</p>
                <Link 
                  to="/artikel" 
                  className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Lihat Semua Artikel
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </MainLayout>
  );
}