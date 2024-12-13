import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

const TabelKucing = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [kucingData, setKucingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State untuk pencarian

  const fetchKucingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/v1/kucing', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKucingData(response.data.data);
      setError('');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat mengambil data kucing';

      setError(errorMessage);
      console.error('Error fetching kucing data:', error);
    } finally {
      setLoading(false);
    }
  };

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
    const confirmDelete = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data kucing ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });
  
    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/v1/kucing/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Log response untuk melihat hasil penghapusan
        console.log('Delete Response:', response.data);
  
        fetchKucingData();
        Swal.fire('Terhapus!', 'Data kucing berhasil dihapus.', 'success');
      } catch (error) {
        console.error('Error deleting kucing:', error);
        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus data kucing.', 'error');
      }
    }
  };

  const handleAddKucing = () => {
    navigate('/add-kucing');
  };

  // Filter data kucing berdasarkan searchTerm
  const filteredKucingData = kucingData.filter((kucing) =>
    kucing.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tampilan loading
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
      <h2 className="text-4xl font-bold mb-6 text-center text -[#BFECFF]">
        🐱 Data Kucing 🐱
      </h2>
      <button
        className="bg-[#FFCCEA] text-[#2A2A2A] px-6 py-2 rounded-full mb-4 hover:bg-[#FFCCEA]/80 transition"
        onClick={handleAddKucing}
      >
        ✨ Tambah Data Kucing ✨
      </button>

      {/* Input Pencarian */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama kucing..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredKucingData && filteredKucingData.length > 0 ? (
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
              {filteredKucingData.map((kucing, index) => (
                <tr key={kucing.id} className="border-t border-[#CDC1FF]">
                  <td className="px-6 py-3 text-sm">{index + 1}</td>
                  <td className="px-6 py-3 text-sm">{kucing.nama}</td>
                  <td className="px-6 py-3 text-sm">
                    {kucing.foto ? (
                      <img
                        src={`http://localhost:3001/uploads/${kucing.foto}`}
                        alt={kucing.nama}
                        className="w-20 h-20 object-contain rounded-full shadow-md"
                      />
                    ) : (
                      'Tidak ada foto'
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm">{kucing.ras}</td>
                  <td className="px-6 py-3 text-sm">{kucing.umur} tahun</td>
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