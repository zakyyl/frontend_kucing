import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TabelPengajuan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pengajuanData: initialData } = location.state || {};
  const [pengajuanData, setPengajuanData] = useState(initialData || []);

  const handleEdit = (id) => {
    navigate(`/edit-pengajuan/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengajuan ini?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/pengajuan/${id}`);
        setPengajuanData(pengajuanData.filter((pengajuan) => pengajuan.id_pengajuan !== id));
        alert("Pengajuan berhasil dihapus");
      } catch (error) {
        console.error("Error deleting pengajuan:", error);
        alert("Terjadi kesalahan saat menghapus pengajuan");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Data Pengajuan</h2>
      {pengajuanData && pengajuanData.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID Pengajuan</th>
              <th>Nama Kucing</th>
              <th>Nama Pengguna</th>
              <th>Tanggal Pengajuan</th>
              <th>Status Pengajuan</th>
              <th>Motivasi</th>
              <th>Kondisi Rumah</th>
              <th>Pengalaman Peliharaan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengajuanData.map((pengajuan) => (
              <tr key={pengajuan.id_pengajuan}>
                <td>{pengajuan.id_pengajuan}</td>
                <td>{pengajuan.Kucing?.nama || 'N/A'}</td>
                <td>{pengajuan.Pengguna?.nama || 'N/A'}</td>
                <td>{new Date(pengajuan.tanggal_pengajuan).toLocaleDateString()}</td>
                <td>{pengajuan.status_pengajuan}</td>
                <td>{pengajuan.motivasi}</td>
                <td>{pengajuan.kondisi_rumah}</td>
                <td>{pengajuan.pengalaman_peliharaan}</td>
                <td>
                  <button className="btn btn-warning mr-2" onClick={() => handleEdit(pengajuan.id_pengajuan)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(pengajuan.id_pengajuan)}>
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

export default TabelPengajuan;
