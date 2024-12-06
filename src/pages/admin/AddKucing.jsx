import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddKucing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    umur: '',
    ras: '',
    jk: '',
    kondisi: '',
    deskripsi: '',
    foto: null
  });

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
      await axios.post('http://localhost:3001/api/v1/kucing', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Data kucing berhasil ditambahkan');
      navigate('/tabel/kucing'); // Arahkan kembali ke halaman tabel kucing setelah data ditambahkan
    } catch (error) {
      console.error('Error adding kucing:', error);
      alert('Terjadi kesalahan saat menambahkan data kucing');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tambah Data Kucing</h2>
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
          />
        </div>

        <button type="submit" className="btn btn-primary">Simpan</button>
      </form>
    </div>
  );
};

export default AddKucing;
