// src/Pages/ArticleDetailPage.tsx - Fixed API Integration
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import { useApi } from "../hooks/useApi";  
import { articleService, type Article } from "../services/articleService";
import { useMutation } from "../hooks/useApi";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState("");

  // Fetch single article from API
  const { data: article, loading, error } = useApi<Article>(
    () => articleService.getArticle(id!),
    [id]
  );

  // Mutations for interactions
  const { mutate: likeArticle } = useMutation(
    (articleId: string) => articleService.likeArticle(articleId)
  );

  const { mutate: dislikeArticle } = useMutation(
    (articleId: string) => articleService.dislikeArticle(articleId)
  );

  const { mutate: addComment } = useMutation(
    ({ articleId, content }: { articleId: string; content: string }) => 
      articleService.addComment(articleId, content)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLike = () => {
    if (id) {
      likeArticle(id);
      // Optimistically update local state
      // In a real app, you'd want to refetch or update state properly
    }
  };

  const handleDislike = () => {
    if (id) {
      dislikeArticle(id);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && id) {
      addComment({ articleId: id, content: newComment.trim() });
      setNewComment("");
    }
  };

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link artikel telah disalin ke clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || "Artikel yang Anda cari tidak ditemukan."}
          </p>
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden mb-10">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/default-article.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-sm uppercase text-green-200 tracking-widest mb-1">
            {article.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Breadcrumb + Info */}
      <div className="max-w-4xl mx-auto px-4 mb-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
        <div>
          <Link to="/" className="hover:underline hover:text-green-600">Beranda</Link> /{" "}
          <Link to="/artikel" className="hover:underline hover:text-green-600">Artikel</Link> /{" "}
          <span className="text-green-800 dark:text-green-300 font-medium">{article.title}</span>
        </div>
        <div className="text-xs sm:text-sm italic">
          {new Date(article.createdAt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        {/* Article Body */}
        <div
          className="prose dark:prose-invert prose-lg max-w-none leading-relaxed mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Interaction Buttons */}
        <div className="flex items-center gap-4 py-6 border-y border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition"
          >
            <Heart className="w-4 h-4" />
            Suka ({article.likes})
          </button>
          
          <button
            onClick={handleDislike}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
          >
            👎 ({article.dislikes})
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
          >
            <Share2 className="w-4 h-4" />
            Bagikan
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Komentar ({article.comments?.length || 0})
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tulis komentar Anda..."
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Kirim Komentar
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {article.comments && article.comments.length > 0 ? (
              article.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-green-600">
                      {comment.author?.username || 'Anonymous'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Belum ada komentar. Jadilah yang pertama berkomentar!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Link
          to="/artikel"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Artikel
        </Link>
      </div>
    </motion.div>
  );
}