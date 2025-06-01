// src/components/HeroSection.tsx
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative text-center py-24 bg-gradient-to-b from-green-100 via-green-50 to-white overflow-hidden">
      {/* Glass Card Container */}
      <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/70 rounded-2xl shadow-lg p-10 border border-green-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
          🌍 Bersama Wujudkan Bumi yang Lebih Hijau
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Dapatkan inspirasi, lakukan aksi nyata, dan jadi bagian dari komunitas peduli lingkungan.  
          Satu langkah kecilmu bisa berdampak besar!
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/artikel")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            🌿 Baca Artikel
          </button>
          <button
            onClick={() => navigate("/edukasi")}
            className="border border-green-600 text-green-700 hover:bg-green-100 font-semibold px-6 py-2 rounded-full transition-transform transform hover:scale-105"
          >
            📘 Mulai Belajar
          </button>
        </div>
      </div>
    </section>
  );
}
