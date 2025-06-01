import { FC } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface GreenCommitmentProps {
  onCommit: (points: number, label: string, category: string) => void;
}

const actions = [
  { label: "Mengurangi Plastik", points: 10, category: "Sampah" },
  { label: "Menanam Tanaman", points: 15, category: "Berkebun" },
  { label: "Mengompos Sampah Organik", points: 12, category: "Sampah" },
  { label: "Menggunakan Transportasi Umum", points: 8, category: "Umum" },
];

const GreenCommitment: FC<GreenCommitmentProps> = ({ onCommit }) => {
  return (
    <motion.div
      className="bg-white py-10 px-6 rounded-xl shadow-md max-w-3xl mx-auto my-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
        💚 Komitmen Hijau Hari Ini
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() =>
                onCommit(action.points, action.label, action.category)
              }
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl w-full transition-all"
            >
              {action.label} (+{action.points} poin)
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GreenCommitment;
