import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditKucing = () => {
  const { id } = useParams();
  const [kucing, setKucing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKucing = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/kucing/${id}`);
        setKucing(response.data.data);
      } catch (error) {
        console.error("Error fetching kucing data:", error);
      }
    };

    fetchKucing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKucing({
      ...kucing,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/v1/kucing/${id}`, kucing);
      alert("Data kucing berhasil diperbarui");

      const response = await axios.get('http://localhost:3001/api/v1/kucing');
      const kucingData = response.data.data;

      navigate('/tabel/kucing', { state: { kucingData } });
    } catch (error) {
      console.error("Error updating kucing:", error);
      alert("Terjadi kesalahan saat memperbarui data kucing");
    }
  };

  if (kucing === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Kucing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="form-control"
            value={kucing.nama || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ras" className="form-label">ras</label>
          <input
            type="text"
            id="ras"
            name="ras"
            className="form-control"
            value={kucing.ras || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="umur" className="form-label">Umur</label>
          <input
            type="text"
            id="umur"
            name="umur"
            className="form-control"
            value={kucing.umur || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            className="form-control"
            value={kucing.deskripsi || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Simpan</button>
      </form>
    </div>
  );
};

export default EditKucing;
