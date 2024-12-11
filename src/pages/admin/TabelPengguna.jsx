import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const TabelPengguna = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { penggunaData: initialData } = location.state || {}; // Ambil data awal dari state jika ada
  const [penggunaData, setPenggunaData] = useState(initialData || []); // State untuk menyimpan data pengguna

  const editSuccess = useSelector((state) => state.editSuccess); // Ambil status editSuccess dari Redux

  const handleEdit = (id) => {
    navigate(`/edit-pengguna/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (confirmDelete) {
      try {
        // Kirim request ke backend untuk menghapus pengguna
        await axios.delete(`http://localhost:3001/api/v1/pengguna/${id}`);
        // Update state untuk menghapus pengguna dari tabel
        setPenggunaData(penggunaData.filter((pengguna) => pengguna.id !== id));
        alert("Data pengguna berhasil dihapus");
      } catch (error) {
        console.error("Error deleting pengguna:", error);
        alert("Terjadi kesalahan saat menghapus data pengguna");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">Data Pengguna</h2>

      {editSuccess && (
        <div className="alert alert-success bg-green-100 text-green-700 p-4 rounded-lg mb-4">
          <span className="font-semibold">Data pengguna berhasil diperbarui!</span>
        </div>
      )}

      {penggunaData && penggunaData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">Nama</th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">Email</th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">No Telepon</th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">Alamat</th>
                <th className="px-6 py-3 text-sm font-semibold text-center text-purple-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {penggunaData.map((pengguna) => (
                <tr key={pengguna.id} className="border-t border-gray-200">
                  <td className="px-6 py-4 text-sm text-gray-800">{pengguna.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{pengguna.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{pengguna.no_telepon}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{pengguna.alamat}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="px-4 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition duration-300 mr-2"
                      onClick={() => handleEdit(pengguna.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-400 text-white rounded-full hover:bg-red-500 transition duration-300"
                      onClick={() => handleDelete(pengguna.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">Tidak ada data tersedia</p>
      )}
    </div>
  );
};

export default TabelPengguna;
