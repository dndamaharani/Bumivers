import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

function Welcome() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/beranda');
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 pt-28 pb-20 relative overflow-hidden">
        {/* Optional background blur layer */}
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm z-0" />

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-green-700 dark:text-green-300 mb-4 leading-tight"
          >
            Selamat Datang di <span className="text-green-800 dark:text-green-200">Bumivers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6"
          >
            Platform edukasi & aksi lingkungan untuk masa depan yang lebih hijau 
          </motion.p>

          <motion.button
            onClick={handleExplore}
            whileHover={{ scale: 1.07 }}
            animate={{ opacity: 1, scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition z-20"
          >
            Jelajahi Sekarang
          </motion.button>
        </motion.div>

        {/* Globe animasi */}
        <motion.img
          src="/images/globe-eco.png"
          alt="Globe dan daun"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute bottom-10 right-10 w-64 md:block hidden pointer-events-none opacity-10"
        />

        {/* Daun dekoratif */}
        <motion.img
          src="/images/leaves-decor.png"
          alt="Dekorasi daun"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-0 left-0 w-40 md:block hidden pointer-events-none"
        />
      </section>
    </>
  );
}

export default Welcome;
