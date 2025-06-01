// src/Pages/Login.tsx - TypeScript Safe Version
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { login } from "../utils/auth";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(form.email, form.password);

      // DEBUG: Log the response
      console.log("🔍 Login result:", result);
      console.log("🔍 Result success:", result.success);
      console.log("🔍 Result data:", result.data);

      if (result.success && result.data) {
        const user = result.data.user;
        console.log("🔍 User data:", user);
        console.log("🔍 User role:", user?.role);

        if (user?.role === 'admin') {
          console.log("🔍 Navigating to admin dashboard");
          navigate("/admin-dashboard");
        } else {
          console.log("🔍 Navigating to user dashboard");
          navigate("/dashboard");
        }
      } else {
        console.log("🔍 Login failed:", result.error);
        setError(result.error || "Login gagal");
      }
    } catch (err: any) {
      console.log("🔍 Login error:", err);
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // For now, show alert that Google login is not available
    alert("Google Login akan segera tersedia! Silakan gunakan email dan password.");
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 hidden md:flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-50" />
        <div className="relative z-10 text-center px-10">
          <h1 className="text-white text-4xl font-bold mb-4">
            Selamat Datang di <span className="text-green-300">Bumiverse</span>
          </h1>
          <p className="text-white text-lg">
            Platform berbagi ide dan inspirasi ramah lingkungan.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <h2 className="text-3xl font-semibold text-green-700 text-center">
            Masuk ke Akun Anda
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Sedang masuk..." : "Masuk"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">atau</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-green-50 border border-gray-300 py-3 rounded-lg hover:bg-green-100 transition"
          >
            <FcGoogle size={24} />
            <span className="text-black font-medium">Masuk dengan Google</span>
          </button>

          <p className="text-center text-sm text-gray-700">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-green-600 hover:underline font-medium"
            >
              Daftar di sini
            </a>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Demo Login:</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Admin:</strong> admin@bumiverse.com / admin123</p>
              <p><strong>User:</strong> user@bumiverse.com / user123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;