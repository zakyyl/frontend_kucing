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
    <div className="container mt-5">
      <h2>Data Pengguna</h2>

      {editSuccess && <div className="alert alert-success">Data pengguna berhasil diperbarui!</div>}

      {penggunaData && penggunaData.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>No Telepon</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penggunaData.map((pengguna) => (
              <tr key={pengguna.id}>
                <td>{pengguna.nama}</td>
                <td>{pengguna.email}</td>
                <td>{pengguna.no_telepon}</td>
                <td>{pengguna.alamat}</td>
                <td>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(pengguna.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(pengguna.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default TabelPengguna;
