import React from "react";
import { motion } from "framer-motion";

const TentangPage: React.FC = () => {
  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        className="max-w-6xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-16 grid md:grid-cols-2 gap-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Ilustrasi / Gambar */}
        <div className="flex items-center justify-center">
          <img
            src="/images/about-illustration.png"
            alt="Ilustrasi Tentang Kami"
            className="w-full max-w-sm"
          />
        </div>

        {/* Konten Teks */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-green-700 mb-4">
            Tentang Bumivers
          </h1>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            <strong>Bumivers</strong> adalah platform edukasi dan aksi lingkungan untuk masa depan yang lebih hijau.
            Kami mengajak anda semua untuk ikut <span className="text-green-600 font-semibold">peduli</span>,
            <span className="text-green-600 font-semibold"> belajar</span>, dan
            <span className="text-green-600 font-semibold"> bertindak</span>.
          </p>
          <p className="text-gray-600 text-sm">
            Bergabunglah dalam gerakan hijau bersama kami. Setiap aksi kecilmu berarti besar untuk Bumi 🌍💚
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TentangPage;
