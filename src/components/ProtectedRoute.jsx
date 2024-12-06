import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, token }) => {
  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  return children; // Jika ada token, tampilkan konten anak (halaman yang dilindungi)
};

export default ProtectedRoute;
