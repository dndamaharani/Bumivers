import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { useApi } from "../hooks/useApi";
import { educationService, type EducationTopic } from "../services/educationService";

export default function EdukasiPage() {
  // Fetch education topics from API
  const { data: educationTopics, loading, error } = useApi<EducationTopic[]>(
    () => educationService.getEducationTopics()
  );

  return (
    <MainLayout>
      <section className="min-h-screen bg-white dark:bg-gray-900 px-6 pt-28 pb-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold text-green-700 dark:text-green-300 mb-4"
          >
            Belajar Menjaga Lingkungan 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Temukan berbagai topik edukatif untuk meningkatkan kepedulian dan aksi nyata demi bumi yang lebih baik.
          </motion.p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-300 text-lg">Memuat topik edukasi...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="text-red-500 text-lg mb-4">❌ Gagal memuat topik edukasi</div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Education Topics Grid */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {educationTopics && educationTopics.length > 0 ? (
              educationTopics.map((topic, i) => (
                <Link to={`/edukasi/${topic._id}`} key={topic._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer"
                  >
                    <img
                      src={topic.imageUrl}
                      alt={topic.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/default-education.jpg';
                      }}
                    />
                    <h3 className="text-xl font-semibold text-green-700 dark:text-green-200 mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {topic.description}
                    </p>
                    <div className="mt-3 text-green-600 hover:underline font-medium text-sm">
                      Baca Selengkapnya →
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Belum ada topik edukasi
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Topik edukasi akan segera tersedia!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {!loading && !error && educationTopics && educationTopics.length > 0 && (
          <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
            Tersedia {educationTopics.length} topik edukasi
          </div>
        )}
      </section>
    </MainLayout>
  );
}