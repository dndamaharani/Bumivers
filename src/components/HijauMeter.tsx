import { motion } from "framer-motion";
import { CheckCircle, Flame, Leaf, Award } from "lucide-react";

interface HijauMeterProps {
  points: number;
  maxPoints?: number;
}

export default function HijauMeter({ points, maxPoints = 100 }: HijauMeterProps) {
  const percentage = Math.min((points / maxPoints) * 100, 100);

  const getColor = () => {
    if (percentage >= 75) return "bg-green-600";
    if (percentage >= 50) return "bg-yellow-400";
    if (percentage >= 25) return "bg-orange-400";
    return "bg-red-400";
  };

  const getLevel = () => {
    if (percentage >= 75) return { icon: <Award className="text-green-700" size={20} />, label: "Ahli Hijau" };
    if (percentage >= 50) return { icon: <Leaf className="text-yellow-500" size={20} />, label: "Aktivis Alam" };
    if (percentage >= 25) return { icon: <Flame className="text-orange-500" size={20} />, label: "Pemula Peduli" };
    return { icon: <CheckCircle className="text-red-400" size={20} />, label: "Mulai dari Sini" };
  };

  const level = getLevel();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mt-12 text-center max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">🌱 HijauMeter</h2>

      <div className="text-lg text-gray-700 dark:text-gray-200 mb-2">
        Total Komitmenmu:{" "}
        <span className="font-bold text-green-800 dark:text-green-400">{points} poin</span>
      </div>

      <div className="flex justify-center items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1">
          {level.icon}
          {level.label}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-5 overflow-hidden">
        <motion.div
          className={`h-full ${getColor()} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {percentage.toFixed(0)}% dari target {maxPoints} poin
      </p>
    </div>
  );
}
