import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-100 text-gray-800 py-6 text-center border-t border-gray-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-medium">
        © 2025 <strong className="text-green-700">Bumivers</strong>  Semua hak dilestarikan.
      </p>
      <p className="text-sm mt-2 text-gray-600 italic">
        "Jaga alam, maka alam akan menjaga kita." — <span className="text-green-600">Bumiverse</span>
      </p>

      
    </motion.footer>
  );
}
