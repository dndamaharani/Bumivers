import React from "react";

type LeaderboardUser = {
  id: string;
  name: string;
  points: number;
};

type Props = {
  data: LeaderboardUser[];
};

export default function LeaderboardTable({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-8 shadow">
      <h2 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300 flex items-center gap-2">
        🏆 Papan Peringkat
      </h2>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-gray-600 dark:text-gray-300 border-b">
          <tr>
            <th className="py-2">Peringkat</th>
            <th className="py-2">Nama</th>
            <th className="py-2">Poin</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={user.id}
              className={`${
                index === 0
                  ? "bg-yellow-100 dark:bg-yellow-800 font-bold"
                  : index === 1
                  ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                  : index === 2
                  ? "bg-orange-100 dark:bg-orange-800 font-medium"
                  : ""
              } hover:bg-green-50 dark:hover:bg-green-700 transition`}
            >
              <td className="py-2 px-1">
                {index + 1}{" "}
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
              </td>
              <td className="py-2 px-1">{user.name}</td>
              <td className="py-2 px-1">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
