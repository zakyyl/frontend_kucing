import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosinstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/admindashboard.css';

const AdminDashboard = () => {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [kucingData, setKucingData] = useState([]);
  const [penggunaData, setPenggunaData] = useState([]);
  const [adopsiData, setAdopsiData] = useState([]);
  const [pengajuanData, setPengajuanData] = useState([]);

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [token, role, navigate]);

  const fetchData = async () => {
    try {
      const [kucingResponse, penggunaResponse, adopsiResponse, pengajuanResponse] = await Promise.all([
        axiosInstance.get('/api/v1/kucing'),
        axiosInstance.get('/api/v1/pengguna'),
        axiosInstance.get('/api/v1/adopsi'),
        axiosInstance.get('/api/v1/pengajuan'),
      ]);

      setKucingData(kucingResponse.data.data || []);
      setPenggunaData(penggunaResponse.data.data || []);
      setAdopsiData(adopsiResponse.data.data || []);
      setPengajuanData(pengajuanResponse.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  return (
    <div className="admin-dashboard container mt-5">
      {token && role === 'admin' ? (
        <>
          <div className="h2">
            <h2>Admin Dashboard</h2>
          </div>
          <div className="row">
            {/* Kucing Data */}
            <div className="col-md-3">
              <div className="card border-lightblue mb-4" onClick={() => goToTabel('kucing')}>
                <div className="card-header bg-lightblue text-white">Data Kucing</div>
                <div className="card-body">
                  <h5 className="card-title">Total Kucing</h5>
                  <p className="card-text">{kucingData.length} Kucing Terdaftar</p>
                </div>
              </div>
            </div>

            {/* Pengguna Data */}
            <div className="col-md-3">
              <div className="card border-lightpurple mb-4" onClick={() => goToTabel('pengguna')}>
                <div className="card-header bg-lightpurple text-white">Data Pengguna</div>
                <div className="card-body">
                  <h5 className="card-title">Total Pengguna</h5>
                  <p className="card-text">{penggunaData.length} Pengguna Terdaftar</p>
                </div>
              </div>
            </div>

            {/* Adopsi Data */}
            <div className="col-md-3">
              <div className="card border-cream mb-4" onClick={() => goToTabel('adopsi')}>
                <div className="card-header bg-cream text-dark">Data Adopsi</div>
                <div className="card-body">
                  <h5 className="card-title">Total Adopsi</h5>
                  <p className="card-text">{adopsiData.length} Proses Adopsi</p>
                </div>
              </div>
            </div>

            {/* Pengajuan Data */}
            <div className="col-md-3">
              <div className="card border-lightpink mb-4" onClick={() => goToTabel('pengajuan')}>
                <div className="card-header bg-lightpink text-white">Data Pengajuan</div>
                <div className="card-body">
                  <h5 className="card-title">Total Pengajuan</h5>
                  <p className="card-text">{pengajuanData.length} Pengajuan Masuk</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-warning text-center">
          <h4>Please log in as an admin to view this page.</h4>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
