import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import MainLayout from "../components/MainLayout";
import { useApi } from "../hooks/useApi";
import { educationService, type EducationTopic } from "../services/educationService";

export default function EdukasiDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Fetch single education topic from API
  const { data: topic, loading, error } = useApi<EducationTopic>(
    () => educationService.getEducationTopic(id!),
    [id]
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Memuat topik edukasi...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !topic) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Topik Tidak Ditemukan</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error || "Topik edukasi yang Anda cari tidak ditemukan."}
            </p>
            <Link
              to="/edukasi"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Edukasi
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:underline hover:text-green-600">Beranda</Link> /{" "}
              <Link to="/edukasi" className="hover:underline hover:text-green-600">Edukasi</Link> /{" "}
              <span className="text-green-800 dark:text-green-300 font-medium">{topic.title}</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <BookOpen size={40} className="text-green-600" />
              <div>
                <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">
                  {topic.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {topic.description}
                </p>
              </div>
            </div>

            {/* Main Image */}
            {topic.imageUrl && (
              <div className="mb-8">
                <img
                  src={topic.imageUrl}
                  alt={topic.title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/default-education.jpg';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="prose dark:prose-invert prose-lg max-w-none leading-relaxed mb-8">
              <div
                dangerouslySetInnerHTML={{ __html: topic.content }}
                className="text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* Metadata */}
            <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                📅 Informasi Topik
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dipublikasikan: {new Date(topic.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                💚 Siap Beraksi?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Setelah belajar, mari wujudkan pengetahuan ini dalam aksi nyata!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/aksi"
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  🌱 Mulai Beraksi
                </Link>
                <Link
                  to="/artikel"
                  className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition"
                >
                  📖 Baca Artikel Lain
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Link
                to="/edukasi"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Edukasi
              </Link>
              
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Bagikan pengetahuan ini dengan teman-temanmu! 🌍
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}