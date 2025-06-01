import { useParams, Link } from "react-router-dom";
import { articlesData } from "../data/Articles";
import { useEffect, useState } from "react";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState("");

  const article = articlesData.find((a) => a.id === id);

  // Load data dari localStorage saat komponen mount
  useEffect(() => {
    if (article) {
      const stored = localStorage.getItem(`article-${article.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLikes(parsed.likes || 0);
        setDislikes(parsed.dislikes || 0);
        setComments(parsed.comments || []);
      }
    }
  }, [article]);

  // Simpan perubahan ke localStorage setiap ada update
  useEffect(() => {
    if (article) {
      localStorage.setItem(
        `article-${article.id}`,
        JSON.stringify({ likes, dislikes, comments })
      );
    }
  }, [likes, dislikes, comments, article]);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleDislike = () => setDislikes((prev) => prev + 1);
  const handleAddComment = () => {
    if (commentInput.trim() !== "") {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  if (!article) {
    return (
      <div className="text-center py-10 bg-green-50 min-h-screen">
        <h2 className="text-4xl font-bold text-green-600">404</h2>
        <p className="text-lg mt-2">Halaman tidak ditemukan</p>
        <Link
          to="/"
          className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10">
      <img
        src={article.image}
        alt={article.title}
        className="w-full rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold text-green-800 mb-2">{article.title}</h1>
      <p className="text-sm text-gray-600 italic mb-4">Kategori: {article.category}</p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Voting */}
      <div className="flex gap-4 mt-6">
        <button onClick={handleLike} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          👍 {likes}
        </button>
        <button onClick={handleDislike} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          👎 {dislikes}
        </button>
      </div>

      {/* Komentar */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Komentar</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder="Tulis komentar..."
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Kirim
          </button>
        </div>
        <ul className="space-y-2">
          {comments.map((comment, idx) => (
            <li key={idx} className="bg-gray-100 p-2 rounded">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleDetail;
