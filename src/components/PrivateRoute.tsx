// src/components/PrivateRoute.tsx - Fixed Auth Check
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  role?: "admin" | "user";
}

const PrivateRoute: React.FC<Props> = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // ← FIXED: Match authService key

  console.log("🔍 PrivateRoute check:");
  console.log("🔍 Token exists:", !!token);
  console.log("🔍 User exists:", !!user);

  // Jika belum login
  if (!token || !user) {
    console.log("🔍 Redirecting to login - missing token or user");
    return <Navigate to="/login" replace />;
  }

  // Jika role ditentukan dan tidak cocok
  try {
    const parsedUser = JSON.parse(user);
    console.log("🔍 Parsed user:", parsedUser);
    console.log("🔍 User role:", parsedUser.role);
    console.log("🔍 Required role:", role);
    
    if (role && parsedUser.role !== role) {
      console.log("🔍 Role mismatch - redirecting to home");
      return <Navigate to="/" replace />;
    }
    
    console.log("🔍 Authentication successful - rendering children");
    return children;
    
  } catch (error) {
    console.error("🔍 Failed to parse user from localStorage:", error);
    // Clear invalid data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;