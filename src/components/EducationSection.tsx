// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import EducationSection from "../components/EducationSection";
import HijauMeter from "../components/HijauMeter";
import GreenCommitment from "../components/GreenCommitment";
import GreenHistory from "../components/GreenHistory";
import ArticleCard from "../components/ArticleCard";
import ArticleDetail from "../components/ArticleDetail";
import { Article, HistoryItem } from "../types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    if (savedPoints) setPoints(parseInt(savedPoints));
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleAddPoints = (point: number, label: string, category: string) => {
    const updatedPoints = points + point;
    setPoints(updatedPoints);
    localStorage.setItem("points", updatedPoints.toString());

    const newEntry = {
      label,
      point,
      category,
      date: new Date().toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  const categories = ["Semua", "Berkebun", "Sampah", "Pertanian"];

  const articles: Article[] = [
    {
      id: "1",
      title: "Cara Menanam Pohon di Perkotaan",
      image: "/images/tree.jpg",
      summary: "Pelajari bagaimana cara menanam pohon di lingkungan perkotaan secara efektif...",
      content: "Detail artikel tentang menanam pohon...",
      category: "Berkebun",
      likes: 10,
      dislikes: 1,
      comments: [
        { name: "Anonim", message: "Artikel ini sangat membantu!", date: "2024-01-01" },
        { name: "Anonim", message: "Mantap!", date: "2024-01-02" },
      ],
    },
    {
      id: "2",
      title: "Tips Mengurangi Sampah Plastik",
      image: "/images/plastic.jpg",
      summary: "Langkah-langkah mudah untuk mengurangi penggunaan plastik dalam kehidupan sehari-hari...",
      content: "Detail artikel tentang sampah plastik...",
      category: "Sampah",
      likes: 25,
      dislikes: 0,
      comments: [
        { name: "Anonim", message: "Harus diterapkan setiap hari", date: "2024-01-03" },
        { name: "Anonim", message: "Love it ❤️", date: "2024-01-04" },
      ],
    },
    {
      id: "3",
      title: "Manfaat Berkebun di Rumah",
      image: "/images/garden.jpg",
      summary: "Berkebun di rumah bisa memberikan banyak manfaat bagi kesehatan dan lingkungan...",
      content: "Detail artikel tentang berkebun...",
      category: "Berkebun",
      likes: 15,
      dislikes: 2,
      comments: [
        { name: "Anonim", message: "Cocok buat saya yang tinggal di apartemen", date: "2024-01-05" },
        { name: "Anonim", message: "Thank you!", date: "2024-01-06" },
      ],
    },
  ];
  

  const filteredArticles = articles.filter(
    (article) =>
      (selectedCategory === "Semua" || article.category === selectedCategory) &&
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-green-100 dark:bg-gray-800 py-20 px-6 text-center relative overflow-hidden transition-colors duration-300">
      <HeroSection />

      {/* Artikel Terbaru */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
          Artikel Terbaru
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              onClick={() => {
                setIsLoadingDetail(true);
                setTimeout(() => {
                  setSelectedArticle(article);
                  setShowDetail(true);
                  setIsLoadingDetail(false);
                }, 500);
              }}
            />
          ))}
        </div>
      </section>

      {/* Filter dan pencarian */}
      <section className="py-10 px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📚 Artikel Bumiverse
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ArticleCard
                {...article}
                onClick={() => {
                  setIsLoadingDetail(true);
                  setTimeout(() => {
                    setSelectedArticle(article);
                    setShowDetail(true);
                    setIsLoadingDetail(false);
                  }, 500);
                }}
              />
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 italic mt-6">
            Artikel tidak ditemukan 💨
          </p>
        )}
      </section>

      <EducationSection />
      <HijauMeter points={points} />
      <GreenCommitment onCommit={handleAddPoints} />
      <GreenHistory data={history} />

      <AnimatePresence>
        {isLoadingDetail && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-40">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {showDetail && selectedArticle && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur z-50"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl relative max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDetail(false)}
                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2"
              >
                ❌
              </button>
              <ArticleDetail
                {...selectedArticle}
                id={selectedArticle.id.toString()}
                onClose={() => setShowDetail(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
