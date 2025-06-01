import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Article } from "../data/articlesData"; // Pastikan path-nya benar

interface ModalDetailArtikelProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

const ModalDetailArtikel: React.FC<ModalDetailArtikelProps> = ({
  article,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-3xl w-full shadow-xl relative max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // agar klik dalam modal tidak menutup
          >
            {/* Tombol tutup */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-full p-2"
            >
              ✕
            </button>

            {/* Konten Artikel */}
            <img
              src={article.image}
              alt={article.title}
              className="rounded-xl mb-4 w-full h-auto object-cover"
            />
            <span className="text-sm text-green-600 font-semibold uppercase">
              {article.category}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
              {article.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {article.content}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalDetailArtikel;
