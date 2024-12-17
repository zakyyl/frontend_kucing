import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

const TabelPengguna = () => {

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [penggunaData, setPenggunaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPenggunaData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/pengguna', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPenggunaData(response.data.data);
      setError('');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat mengambil data pengguna';
      setError(errorMessage);
      console.error('Error fetching pengguna data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPenggunaData();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleEdit = (id) => {
    navigate(`/edit-pengguna/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data pengguna ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/pengguna/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPenggunaData(penggunaData.filter((pengguna) => pengguna.id !== id));
        Swal.fire('Terhapus!', 'Data pengguna berhasil dihapus.', 'success');
      } catch (error) {
        console.error('Error deleting pengguna:', error);
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus data pengguna.', 'error');
      }
    }
  };

  const filteredPenggunaData = penggunaData.filter((pengguna) =>
    pengguna.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-16 h-16"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-lg text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="bg-red-500 text-white p-4 rounded-lg flex items-center justify-between">
          <p>{error}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={fetchPenggunaData}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-10">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-[#BFECFF]">
        👤 Data Pengguna 👤
      </h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Cari berdasarkan nama pengguna..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-1/2 md:w-1/3 lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#BFECFF] transition duration-300"
        />
      </div>

      {filteredPenggunaData && filteredPenggunaData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-lg border border-[#EFEFEF]">
            <thead className="bg-[#BFECFF] text-[#2A2A2A] border-b-2 border-[#CDC1FF]">
              <tr>
                <th className="px-6 py-4 text-lg font-semibold text-left">No</th>
                <th className="px-6 py-4 text-lg font-semibold text-left">Nama</th>
                <th className="px-6 py-4 text-lg font-semibold text-left">Email</th>
                <th className="px-6 py-4 text-lg font-semibold text-left">No Telepon</th>
                <th className="px-6 py-4 text-lg font-semibold text-left">Alamat</th>
                <th className="px-6 py-4 text-lg font-semibold text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredPenggunaData.map((pengguna, index) => (
                <tr key={pengguna.id} className="border-t border-[#EFEFEF] hover:bg-[#F9F9F9] transition duration-200">
                  <td className="px-6 py-3 text-sm">{index + 1}</td>
                  <td className="px-6 py-3 text-sm">{pengguna.nama}</td>
                  <td className="px-6 py-3 text-sm">{pengguna.email}</td>
                  <td className="px-6 py-3 text-sm">{pengguna.no_telepon}</td>
                  <td className="px-6 py-3 text-sm">{pengguna.alamat}</td>
                  <td className="px-6 py-3 text-sm flex gap-3 items-center">
                    <button
                      className="bg-[#CDC1FF] text-[#2A2A2A] px-4 py-2 rounded-full hover:bg-[#CDC1FF]/80 transition duration-300 shadow-md"
                      onClick={() => handleEdit(pengguna.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-[#FFCCEA] text-[#2A2A2A] px-4 py-2 rounded-full hover:bg-[#FFCCEA]/80 transition duration-300 shadow-md"
                      onClick={() => handleDelete(pengguna.id)}
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
        <div className="text-center mt-6 text-gray-600 text-lg">
          Tidak ada data pengguna tersedia. 🐾
        </div>
      )}
    </div>
  );

};

export default TabelPengguna;