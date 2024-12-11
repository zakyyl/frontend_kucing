import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import Statistics from "./components/layout/Statistics";
import AboutUs from "./components/layout/AboutUs";
import Article from "./components/layout/Article";
import FAQ from "./components/layout/Faq";
import Contact from "./components/layout/Contact";
import LoginWeb from "./pages/loginWeb";
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
// import Unauthorized from "./pages/Unauthorized"; // Tambahkan halaman Unauthorized

import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/global.css";

const App = () => {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Hero />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/articles" element={<Article />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<LoginWeb />} />
        <Route path="/register" element={<Register />} />
        <Route path="/statistics" element={<Statistics />} />
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

        {/* Rute Admin - Hanya bisa diakses admin */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tabel/kucing" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TabelKucing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tabel/pengguna" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TabelPengguna />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-pengguna/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EditPengguna />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-kucing/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EditKucing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-kucing" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddKucing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tabel/adopsi" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TabelAdopsi />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tabel/pengajuan" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TabelPengajuan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-pengajuan/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EditPengajuan />
            </ProtectedRoute>
          } 
        />

        {/* Rute User - Hanya bisa diakses user */}
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/kucinglist" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <KucingList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/kucingdetail/:id" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <KucingDetail />
            </ProtectedRoute>
          } 
        />

        {/* Redirect untuk rute tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </Router>
  );
};

export default App;