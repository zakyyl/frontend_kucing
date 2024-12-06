import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TabelKucing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { kucingData: initialData } = location.state || {};
  const [kucingData, setKucingData] = useState(initialData || []);

  const handleEdit = (id) => {
    navigate(`/edit-kucing/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/kucing/${id}`);
        setKucingData(kucingData.filter((kucing) => kucing.id !== id));
        alert("Data kucing berhasil dihapus");
      } catch (error) {
        console.error("Error deleting kucing:", error);
        alert("Terjadi kesalahan saat menghapus data kucing");
      }
    }
  };

  const handleAddKucing = () => {
    navigate('/add-kucing'); // Arahkan ke halaman input data kucing
  };

  return (
    <div className="container mt-5">
      <h2>Data Kucing</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddKucing}>
        Tambah Data Kucing
      </button>

      {kucingData && kucingData.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Foto</th>
              <th>Ras</th>
              <th>Umur</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kucingData.map((kucing) => (
              <tr key={kucing.id}>
                <td>{kucing.nama}</td>
                <td>
                  {/* Menampilkan gambar jika foto ada */}
                  <img 
                    src={`http://localhost:3001/uploads/${kucing.foto}`} 
                    alt={kucing.nama} 
                    style={{ width: '100px', height: 'auto' }} // Sesuaikan ukuran gambar
                  />
                </td>
                <td>{kucing.ras}</td>
                <td>{kucing.umur}</td>
                <td>{kucing.deskripsi}</td>
                <td>
                  <button className="btn btn-warning mr-2" onClick={() => handleEdit(kucing.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(kucing.id)}>
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

export default TabelKucing;
