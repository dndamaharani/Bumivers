// src/components/MainLayout.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-green-900 dark:text-white font-sans flex flex-col">
      {/* Animated Navbar */}
      <motion.div
        className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-800/80 backdrop-blur-md shadow-md"
        initial={{ y: -50, opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        // transition={{ duration: 2 }}
      >
        <Navbar />
      </motion.div>

      {/* Main Content */}
      <motion.main
        className="flex-1 mt-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
