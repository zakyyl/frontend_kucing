import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginWeb from './components/auth/loginWeb';
import Register from './components/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Import komponen dashboard admin dan user
import AdminDashboard from './pages/admin/Admindashboard';
import UserDashboard from './pages/user/Userdashboard';

import TabelKucing from './pages/admin/TabelKucing';
import TabelPengguna from './pages/admin/TabelPengguna';
import TabelAdopsi from './pages/admin/TabelAdopsi';
import TabelPengajuan from './pages/admin/TabelPengajuan';
import EditPengguna from './pages/admin/EditPengguna';
import EditKucing from './pages/admin/EditKucing';
import EditPengajuan from './pages/admin/EditPengajuan';
import AddKucing from './pages/admin/AddKucing';
import KucingList from './pages/user/KucingList';
import KucingDetail from './pages/user/KucingDetail';
import EditProfile from './pages/user/EditProfile';
// import Unauthorized from "./pages/Unauthorized";
import AboutUs from './components/layout/AboutUs';
import Article from './components/layout/Article';
import FAQ from './components/layout/Faq';
import Contact from './components/layout/Contact';


// import './styles/global.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Landing Page sebagai halaman utama */}
        <Route path="/" element={<LandingPage />} />        
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/articles" element={<Article />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />

        {/* Autentikasi */}
        <Route path="/login" element={<LoginWeb />} />
        <Route path="/register" element={<Register />} />

        {/* Rute Admin */}
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
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* Redirect untuk rute tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;