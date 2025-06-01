// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center px-4">
      <h1 className="text-5xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Halaman tidak ditemukan
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
