import React, { useState } from "react";
import ArticleCard from "./ArticleCard"; // pastikan path-nya sesuai
import ModalDetailArtikel from "./ModalDetailArtikel"; // pastikan path-nya sesuai
import { Article } from "../data/articlesData"; // asumsi kamu punya tipe ini

const ArtikelList = ({ articles }: { articles: Article[] }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          id={String(article.id)}
          title={article.title}
          summary={article.summary}
          image={article.image}
          category={article.category}
          onClick={() => handleOpenModal(article)}
        />
      ))}

      {selectedArticle && (
        <ModalDetailArtikel
          article={selectedArticle}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ArtikelList;
