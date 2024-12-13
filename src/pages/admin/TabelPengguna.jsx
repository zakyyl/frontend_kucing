import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

const TabelPengguna = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Pastikan mengambil token dari Redux
  const { penggunaData: initialData } = location.state || {};
  const [penggunaData, setPenggunaData] = useState(initialData || []);
  const [searchTerm, setSearchTerm] = useState('');

  const editSuccess = useSelector((state) => state.editSuccess);

  const handleEdit = (id) => {
    navigate(`/edit-pengguna/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data pengguna akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        // Tambahkan token ke headers
        const response = await axios.delete(
          `http://localhost:3001/api/v1/pengguna/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}` // Pastikan mengirim token
            }
          }
        );

        // Log response untuk debugging
        console.log('Delete Response:', response);

        // Hapus data dari state lokal
        setPenggunaData(penggunaData.filter((pengguna) => pengguna.id !== id));

        // Tampilkan konfirmasi berhasil dihapus
        Swal.fire(
          'Terhapus!',
          'Data pengguna berhasil dihapus.',
          'success'
        );
      } catch (error) {
        // Log error secara detail
        console.error('Error deleting pengguna:', error.response?.data || error.message);

        // Tampilkan pesan error spesifik
        Swal.fire(
          'Gagal!',
          error.response?.data?.message || 'Terjadi kesalahan saat menghapus data pengguna.',
          'error'
        );
      }
    }
  };

  // Filter data pengguna berdasarkan search term
  const filteredPenggunaData = penggunaData.filter((pengguna) =>
    pengguna.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">
        👤 Data Pengguna 👤
      </h2>

      {/* Input Pencarian */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama pengguna..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {editSuccess && (
        <div className="alert alert-success bg-green-100 text-green-700 p-4 rounded-lg mb-4">
          <span className="font-semibold">
            Data pengguna berhasil diperbarui!
          </span>
        </div>
      )}

      {filteredPenggunaData && filteredPenggunaData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <thead className="bg-[#BFECFF] text-[#2A2A2A]">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-left text-black-600">
                  Nama
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-black-600">
                  Email
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-black-600">
                  No Telepon
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-black-600">
                  Alamat
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-center text-black-600">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPenggunaData.map((pengguna) => (
                <tr key={pengguna.id} className="border-t border-gray-200">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {pengguna.nama}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {pengguna.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {pengguna.no_telepon}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {pengguna.alamat}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="bg-[#CDC1FF] text-[#2A2A2A] px-4 py-2 rounded-full hover:bg-[#CDC1FF]/80 transition mr-2"
                      onClick={() => handleEdit(pengguna.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-[#FFCCEA] text-[#2A2A2A] px-4 py-2 rounded-full hover:bg-[#FFCCEA]/80 transition"
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
        <p className="text-center text-gray-600 mt-6">
          Tidak ada data tersedia
        </p>
      )}
    </div>
  );
};

export default TabelPengguna;