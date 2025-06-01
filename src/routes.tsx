import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Articles from "./Pages/Articles";
import Tentang from "./Pages/Tentang";
import Edukasi from "./Pages/Edukasi";
import Kategori from "./Pages/KategoriPage";
import Dashboard from "./components/Dashboard";
import ArticleDetailPage from "./Pages/ArticleDetailPage";
import EdukasiDetailPage from "./Pages/EdukasiDetailPage";
import Aksi from "./Pages/Aksi";
import NotFound from "./Pages/NotFound";

type RoutesConfigProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const RoutesConfig: React.FC<RoutesConfigProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artikel" element={<Articles />} />
      <Route path="/artikel/:id" element={<ArticleDetailPage />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/edukasi" element={<Edukasi />} />
      <Route path="/edukasi/:id" element={<EdukasiDetailPage />} />
      <Route path="/kategori" element={<Kategori />} />
      <Route path="/aksi" element={<Aksi />} />
      <Route
        path="/dashboard"
        element={<Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
