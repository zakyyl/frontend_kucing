import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddKucing = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    nama: '',
    umur: '',
    ras: '',
    jk: '',
    kondisi: '',
    deskripsi: '',
    foto: null
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      foto: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validasi form
    if (!token) {
      setError('Anda harus login terlebih dahulu');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nama', formData.nama);
    formDataToSend.append('umur', formData.umur);
    formDataToSend.append('ras', formData.ras);
    formDataToSend.append('jk', formData.jk);
    formDataToSend.append('kondisi', formData.kondisi);
    formDataToSend.append('deskripsi', formData.deskripsi);
    if (formData.foto) {
      formDataToSend.append('foto', formData.foto);
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/kucing', 
        formDataToSend, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` // Tambahkan Bearer Token
          }
        }
      );

      // Tampilkan pesan sukses
      alert('Data kucing berhasil ditambahkan');
      navigate('/admin/dashboard');
    } catch (error) {
      // Error handling yang lebih komprehensif
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Terjadi kesalahan saat menambahkan data kucing';
      
      setError(errorMessage);
      console.error('Error adding kucing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tambah Data Kucing</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="umur" className="form-label">Umur</label>
          <input
            type="number"
            className="form-control"
            id="umur"
            name="umur"
            value={formData.umur}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ras" className="form-label">Ras</label>
          <input
            type="text"
            className="form-control"
            id="ras"
            name="ras"
            value={formData.ras}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="jk" className="form-label">Jenis Kelamin</label>
          <select
            className="form-control"
            id="jk"
            name="jk"
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

        <div className="mb-3">
          <label htmlFor="kondisi" className="form-label">Kondisi</label>
          <input
            type="text"
            className="form-control"
            id="kondisi"
            name="kondisi"
            value={formData.kondisi}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
          <textarea
            className="form-control"
            id="deskripsi"
            name="deskripsi"
            rows="3"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="foto" className="form-label">Foto</label>
          <input
            type="file"
            className="form-control"
            id="foto"
            name="foto"
            onChange={handleFileChange}
            accept="image/*"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  );
};

export default AddKucing;