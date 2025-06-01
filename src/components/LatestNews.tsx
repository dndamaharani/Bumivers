// src/components/LatestNews.tsx
import { Link } from "react-router-dom";
import articles from "../data/Articles";

export default function LatestNews() {
  const latestArticles = articles.slice(0, 3); // Ambil 3 artikel terbaru

  return (
    <section className="bg-green-100 dark:bg-gray-800 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
          Berita Terbaru
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tetap update dengan informasi dan kabar terkini seputar lingkungan.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {latestArticles.map((article) => (
          <Link
            to={`/artikel/${article.id}`} // disesuaikan dengan route App.tsx
            key={article.id}
            className="group bg-white dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={article.image} // disesuaikan dengan struktur data
              alt={article.title}
              className="rounded-md h-40 w-full object-cover mb-4 group-hover:opacity-90 transition"
            />
            <h3 className="font-semibold text-lg text-green-700 dark:text-green-200 mb-1">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {article.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
