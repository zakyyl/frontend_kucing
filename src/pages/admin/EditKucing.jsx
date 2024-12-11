import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EditKucing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [kucing, setKucing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    ras: '',
    umur: '',
    jk: '',
    kondisi: '',
    deskripsi: '',
    foto: null
  });

  // Fetch data kucing
  useEffect(() => {
    const fetchKucing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/api/v1/kucing/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const kucingData = response.data.data;
        setKucing(kucingData);
        setFormData({
          nama: kucingData.nama || '',
          ras: kucingData.ras || '',
          umur: kucingData.umur || '',
          jk: kucingData.jk || '',
          kondisi: kucingData.kondisi || '',
          deskripsi: kucingData.deskripsi || '',
          foto: null
        });
        
        setError('');
      } catch (error) {
        const errorMessage = error.response?.data?.message 
          || error.message 
          || 'Terjadi kesalahan saat mengambil data kucing';
        
        setError(errorMessage);
        console.error("Error fetching kucing data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchKucing();
    } else {
      navigate('/login');
    }
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Untuk input file, gunakan files[0]
    if (name === 'foto') {
      setFormData(prevState => ({
        ...prevState,
        foto: files ? files[0] : null
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      // Validasi input
      const requiredFields = ['nama', 'ras', 'umur', 'jk', 'kondisi', 'deskripsi'];
      const missingFields = requiredFields.filter(field => !formData[field]);
  
      if (missingFields.length > 0) {
        throw new Error(`Field berikut harus diisi: ${missingFields.join(', ')}`);
      }
  
      const formDataToSend = new FormData();
      
      // Tambahkan semua field
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          const value = key === 'umur' ? String(formData[key]) : formData[key];
          formDataToSend.append(key, value);
        }
      });
  
      const response = await axios.put(`http://localhost:3001/api/v1/kucing/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.data && (response.data.status === 'Updated' || response.data.status === 'success')) {
        alert("Data kucing berhasil diperbarui");
        navigate('/tabel/kucing');
      } else {
        throw new Error('Gagal memperbarui data kucing');
      }
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan saat memperbarui data kucing';
      alert(`Gagal memperbarui data: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto"></div>
          <p className="text-lg text-white mt-3">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger bg-red-100 text-red-800 p-4 rounded-lg">
          <p>{error}</p>
          <button 
            className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-400"
            onClick={() => window.location.reload()}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-10 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-pink-600">Edit Kucing</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            value={formData.nama}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ras" className="block text-sm font-medium text-gray-700">Ras</label>
          <input
            type="text"
            id="ras"
            name="ras"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            value={formData.ras}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="umur" className="block text-sm font-medium text-gray-700">Umur (bulan)</label>
          <input
            type="number"
            id="umur"
            name="umur"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            value={formData.umur}
            onChange={handleChange}
            required
            disabled={loading}
            min="0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="jk" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <select
            id="jk"
            name="jk"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            value={formData.jk}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Jantan">Jantan</option>
            <option value="Betina">Betina</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="kondisi" className="block text-sm font-medium text-gray-700">Kondisi</label>
          <input
            type="text"
            id="kondisi"
            name="kondisi"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            value={formData.kondisi}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto (Opsional)</label>
          <input
            type="file"
            id="foto"
            name="foto"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="w-full px-4 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-400 transition"
          disabled={loading}
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default EditKucing;
