// src/App.tsx - Re-enabled PrivateRoute (Fixed)
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Tentang from "./Pages/Tentang";
import Artikel from "./Pages/Articles";
import ArtikelDetail from "./Pages/ArticleDetailPage";
import Edukasi from "./Pages/Edukasi";
import EdukasiDetail from "./Pages/EdukasiDetailPage";
import Kategori from "./Pages/KategoriPage";
import KategoriDetailPage from "./Pages/KategoriDetailPage";
import Aksi from "./Pages/Aksi";
import NotFound from "./Pages/NotFound";
import DashboardPage from "./Pages/DashboardPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute"; // ← RE-ENABLED

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/artikel/:id" element={<ArtikelDetail />} />
          <Route path="/edukasi" element={<Edukasi />} />
          <Route path="/edukasi/:id" element={<EdukasiDetail />} />
          <Route path="/aksi" element={<Aksi />} />
          
          {/* PROTECTED ROUTES - Fixed PrivateRoute */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
          
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/kategori/:id" element={<KategoriDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;