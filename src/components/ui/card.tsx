import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      {children}
    </div>
  );
}