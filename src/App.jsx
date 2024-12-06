import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import Statistics from "./components/layout/Statistics";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./pages/admin/Admindashboard";
import UserDashboard from "./pages/user/Userdashboard";
import TabelKucing from './pages/admin/TabelKucing';
import TabelPengguna from './pages/admin/TabelPengguna';
import TabelAdopsi from './pages/admin/TabelAdopsi';
import TabelPengajuan from './pages/admin/TabelPengajuan';
import EditPengguna from "./pages/admin/EditPengguna";
import EditKucing from "./pages/admin/EditKucing";
import EditPengajuan from "./pages/admin/EditPengajuan";
import AddKucing from "./pages/admin/AddKucing";
import KucingList from "./pages/user/KucingList";
import KucingDetail from "./pages/user/KucingDetail";


import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

import "./styles/global.css";

const App = () => {
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/statistics" element={<Statistics />} />

        {/* Halaman yang dilindungi */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute token={token}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute token={token}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Rute untuk Tabel */}
        <Route path="/tabel/kucing" element={<TabelKucing />} />
        <Route path="/tabel/pengguna" element={<TabelPengguna />} />
        <Route path="/edit-pengguna/:id" element={<EditPengguna />} />
        <Route path="/edit-kucing/:id" element={<EditKucing />} />
        <Route path="/add-kucing" element={<AddKucing />} />
        <Route path="/tabel/adopsi" element={<TabelAdopsi />} />
        <Route path="/tabel/pengajuan" element={<TabelPengajuan />} />
        <Route path="/edit-pengajuan/:id" element={<EditPengajuan />} />

        <Route path="/kucinglist" element={<KucingList />} />
        <Route path="/kucingdetail/:id" element={<KucingDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
