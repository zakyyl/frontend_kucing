import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const TabelKucing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [kucingData, setKucingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fungsi untuk mengambil data kucing
  const fetchKucingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/v1/kucing', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setKucingData(response.data.data);
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Terjadi kesalahan saat mengambil data kucing';

      setError(errorMessage);
      console.error('Error fetching kucing data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat komponen dimount
  useEffect(() => {
    if (token) {
      fetchKucingData();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleEdit = (id) => {
    navigate(`/edit-kucing/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmDelete) {
      try {
        console.log('Attempting to delete kucing with ID:', id);

        const response = await axios.delete(`http://localhost:3001/api/v1/kucing/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response.data);

        // Refresh data setelah delete
        fetchKucingData();

        alert('Data kucing berhasil dihapus');
      } catch (error) {
        console.error('Error deleting kucing:', error);
        alert('Terjadi kesalahan saat menghapus data kucing');
      }
    }
  };

  const handleAddKucing = () => {
    navigate('/add-kucing');
  };

  // Tampilan loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-16 h-16" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-lg text-gray-600">Memuat data...</p>
      </div>
    );
  }

  // Tampilan error
  if (error) {
    return (
      <div className="container mt-5">
        <div className="bg-red-500 text-white p-4 rounded-lg flex items-center justify-between">
          <p>{error}</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={fetchKucingData}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-10">
      <h2 className="text-4xl font-bold mb-6 text-center text-[#BFECFF]">Data Kucing 🐱</h2>
      <button 
        className="bg-[#FFCCEA] text-[#2A2A2A] px-6 py-2 rounded-full mb-4 hover:bg-[#FFCCEA]/80 transition"
        onClick={handleAddKucing}
      >
        ✨ Tambah Data Kucing ✨
      </button>
  
      {kucingData && kucingData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
            <thead className="bg-[#BFECFF] text-[#2A2A2A]">
              <tr>
                <th className="px-6 py-3 text-lg font-semibold">No</th>
                <th className="px-6 py-3 text-lg font-semibold">Nama</th>
                <th className="px-6 py-3 text-lg font-semibold">Foto</th>
                <th className="px-6 py-3 text-lg font-semibold">Ras</th>
                <th className="px-6 py-3 text-lg font-semibold">Umur</th>
                <th className="px-6 py-3 text-lg font-semibold">Jenis Kelamin</th>
                <th className="px-6 py-3 text-lg font-semibold">Kondisi</th>
                <th className="px-6 py-3 text-lg font-semibold">Deskripsi</th>
                <th className="px-6 py-3 text-lg font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kucingData.map((kucing, index) => (
                <tr key={kucing.id} className="border-t border-[#CDC1FF]">
                  <td className="px-6 py-3 text-sm">{index + 1}</td>
                  <td className="px-6 py-3 text-sm">{kucing.nama}</td>
                  <td className="px-6 py-3 text-sm">
                    {kucing.foto ? (
                      <img
                        src={`http://localhost:3001/uploads/${kucing.foto}`}
                        alt={kucing.nama}
                        className="w-20 h-20 object-cover rounded-full shadow-md"
                      />
                    ) : (
                      'Tidak ada foto'
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm">{kucing.ras}</td>
                  <td className="px-6 py-3 text-sm">{kucing.umur} bulan</td>
                  <td className="px-6 py-3 text-sm">{kucing.jk}</td>
                  <td className="px-6 py-3 text-sm">{kucing.kondisi}</td>
                  <td className="px-6 py-3 text-sm">{kucing.deskripsi}</td>
                  <td className="px-6 py-3 text-sm flex gap-4">
                    <button
                      className="bg-[#CDC1FF] text-[#2A2A2A] px-4 py-2 rounded-full hover:bg-[#CDC1FF]/80 transition"
                      onClick={() => handleEdit(kucing.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-[#FFCCEA] text-[#2A2A2A] px-4 py-2 rounded-full hover:bg-[#FFCCEA]/80 transition"
                      onClick={() => handleDelete(kucing.id)}
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-4 text-gray-600">
          Tidak ada data kucing tersedia. 🐾
        </div>
      )}
    </div>
  );
  
};

export default TabelKucing;
