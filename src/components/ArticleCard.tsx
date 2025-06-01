import React from "react";
import { Link } from "react-router-dom";

export interface ArticleCardProps {
  id: string | number;
  title: string;
  summary: string;
  image: string;
  category: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  summary,
  image,
  category,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Gambar */}
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Konten */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        {/* Kategori */}
        <span className="text-xs uppercase text-green-600 font-semibold mb-1">
          {category}
        </span>

        {/* Judul */}
        <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2">
          {title}
        </h3>

        {/* Ringkasan */}
        <p className="text-sm text-gray-600 mb-4">
          {summary.length > 100 ? summary.slice(0, 100) + "..." : summary}
        </p>

        {/* Tombol */}
        <Link
          to={`/artikel/${id}`}
          className="mt-auto text-green-600 hover:text-green-800 text-sm font-medium transition-colors duration-200"
        >
          Baca Selengkapnya →
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
