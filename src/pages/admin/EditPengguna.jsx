// src/components/EditPengguna.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setEditSuccess } from '../../redux/store'; // Impor action Redux

const EditPengguna = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [pengguna, setPengguna] = useState(null); // Inisialisasi dengan null dulu (untuk memulai loading state)
  const navigate = useNavigate(); // Untuk navigasi setelah submit
  const dispatch = useDispatch(); // Untuk mengakses dispatch

  // Fungsi untuk mengambil data pengguna berdasarkan ID
  useEffect(() => {
    const fetchPengguna = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/pengguna/${id}`);
        setPengguna(response.data.data); // Set data pengguna yang di-fetch
      } catch (error) {
        console.error('Error fetching pengguna data:', error);
      }
    };

    fetchPengguna();
  }, [id]); // Efek dijalankan saat ID berubah

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPengguna({
      ...pengguna,
      [name]: value, // Update nilai state sesuai input
    });
  };

  // Fungsi untuk mengirimkan form dan memperbarui data pengguna
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim update ke backend
      await axios.put(`http://localhost:3001/api/v1/pengguna/${id}`, pengguna);
      // Update status edit sukses di Redux
      dispatch(setEditSuccess(true));
      alert('Data pengguna berhasil diperbarui');

      // Ambil data pengguna terbaru setelah perubahan
      const response = await axios.get('http://localhost:3001/api/v1/pengguna');
      const penggunaData = response.data.data;

      // Navigasi ke halaman TabelPengguna dengan state penggunaData
      navigate('/tabel/pengguna', { state: { penggunaData } });
    } catch (error) {
      console.error('Error updating pengguna:', error);
      alert('Terjadi kesalahan saat memperbarui data pengguna');
    }
  };

  // Tampilkan loading jika data pengguna belum ada
  if (pengguna === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Pengguna</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="form-control"
            value={pengguna.nama || ''} // Fallback value jika kosong
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={pengguna.email || ''} // Fallback value jika kosong
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_telepon" className="form-label">No Telepon</label>
          <input
            type="text"
            id="no_telepon"
            name="no_telepon"
            className="form-control"
            value={pengguna.no_telepon || ''} // Fallback value jika kosong
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="alamat" className="form-label">Alamat</label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            className="form-control"
            value={pengguna.alamat || ''} // Fallback value jika kosong
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Simpan</button>
      </form>
    </div>
  );
};

export default EditPengguna;
