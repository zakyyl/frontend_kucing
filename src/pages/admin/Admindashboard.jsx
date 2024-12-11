import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosinstance';

const AdminDashboard = () => {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [kucingData, setKucingData] = useState([]);
  const [penggunaData, setPenggunaData] = useState([]);
  const [adopsiData, setAdopsiData] = useState([]);
  const [pengajuanData, setPengajuanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [token, role, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [kucingResponse, penggunaResponse, adopsiResponse, pengajuanResponse] = await Promise.all([
        axiosInstance.get('/api/v1/kucing', config),
        axiosInstance.get('/api/v1/pengguna', config),
        axiosInstance.get('/api/v1/adopsi', config),
        axiosInstance.get('/api/v1/pengajuan', config),
      ]);

      setKucingData(kucingResponse.data.data || []);
      setPenggunaData(penggunaResponse.data.data || []);
      setAdopsiData(adopsiResponse.data.data || []);
      setPengajuanData(pengajuanResponse.data.data || []);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Terjadi kesalahan saat mengambil data';

      setError(errorMessage);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToTabel = (type) => {
    if (type === 'kucing') {
      navigate(`/tabel/kucing`, { state: { kucingData } });
    } else if (type === 'pengguna') {
      navigate(`/tabel/pengguna`, { state: { penggunaData } });
    } else if (type === 'adopsi') {
      navigate(`/tabel/adopsi`, { state: { adopsiData } });
    } else if (type === 'pengajuan') {
      navigate(`/tabel/pengajuan`, { state: { pengajuanData } });
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard flex flex-col items-center justify-center h-screen">
        <div className="loader border-t-4 border-pink-500 rounded-full w-16 h-16 animate-spin"></div>
        <p className="text-pink-500 font-medium mt-4">Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-lg font-bold">Error:</p>
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="admin-dashboard bg-gradient-to-r from-blue-50 to-pink-50 min-h-screen p-8"
      style={{ backgroundImage: "url('../assets/images/kucang.png')", backgroundSize: '300px' }}
    >
      {token && role === 'admin' ? (
        <>
          <div className="text-4xl font-bold text-center mb-8 text-purple-600">
            🐾 Admin Dashboard 🐾
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            <div
              className="card bg-purple-100 p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-all text-center"
              onClick={() => goToTabel('pengguna')}
            >
              <div className="text-xl font-semibold text-purple-600">Data Pengguna</div>
              <div className="text-4xl font-bold mt-4 text-gray-700">{penggunaData.length}</div>
              <div className="text-sm text-gray-600 mt-2">Pengguna Terdaftar</div>
            </div>
            <div
              className="card bg-blue-100 p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-all text-center"
              onClick={() => goToTabel('kucing')}
            >
              <div className="text-xl font-semibold text-blue-600">Data Kucing</div>
              <div className="text-4xl font-bold mt-4 text-gray-700">{kucingData.length}</div>
              <div className="text-sm text-gray-600 mt-2">Kucing Terdaftar</div>
            </div>
            
            <div
              className="card bg-pink-100 p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-all text-center"
              onClick={() => goToTabel('pengajuan')}
            >
              <div className="text-xl font-semibold text-pink-600">Data Pengajuan</div>
              <div className="text-4xl font-bold mt-4 text-gray-700">{pengajuanData.length}</div>
              <div className="text-sm text-gray-600 mt-2">Pengajuan Masuk</div>
            </div>
            <div
              className="card bg-yellow-100 p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-all text-center"
              onClick={() => goToTabel('adopsi')}
            >
              <div className="text-xl font-semibold text-yellow-600">Data Adopsi</div>
              <div className="text-4xl font-bold mt-4 text-gray-700">{adopsiData.length}</div>
              <div className="text-sm text-gray-600 mt-2">Proses Adopsi</div>
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-warning text-center text-lg font-semibold text-yellow-700">
          <h4>Please log in as an admin to view this page.</h4>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
