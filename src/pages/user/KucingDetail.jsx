import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/kucingdetail.css";

const KucingDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [kucing, setKucing] = useState(null);
  const [motivasi, setMotivasi] = useState("");
  const [kondisiRumah, setKondisiRumah] = useState("");
  const [pengalaman, setPengalaman] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchKucing = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/kucing/${id}`);
        if (response.data && response.data.data) {
          setKucing(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching kucing detail:', error);
      }
    };
    fetchKucing();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id_pengguna = 1; // Ganti dengan ID pengguna yang sedang login
      const status_pengajuan = "pending";

      const response = await axios.post("http://localhost:3001/api/v1/pengajuan", {
        id_kucing: id,
        id_pengguna,
        status_pengajuan,
        motivasi,
        kondisi_rumah: kondisiRumah,
        pengalaman_peliharaan: pengalaman,
      });

      alert("Pengajuan berhasil dibuat!");
      console.log(response.data);
      setMotivasi("");
      setKondisiRumah("");
      setPengalaman("");
    } catch (error) {
      console.error("Error creating pengajuan:", error);
      alert("Gagal membuat pengajuan.");
    } finally {
      setLoading(false);
    }
  };

  if (!kucing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kucing-detail-container">
      <h1>{kucing.nama}</h1>
      <img
        src={`http://localhost:3001/uploads/${kucing.foto}`}
        alt={kucing.nama}
        className="kucing-detail-img"
      />
      <p><strong>Ras:</strong> {kucing.ras}</p>
      <p><strong>Jenis Kelamin:</strong> {kucing.jk}</p>
      <p><strong>Umur:</strong> {kucing.umur} tahun</p>
      <p><strong>Kondisi:</strong> {kucing.kondisi}</p>
      <p>{kucing.deskripsi}</p>

      <form onSubmit={handleSubmit} className="pengajuan-form">
        <h2>Ajukan Adopsi</h2>
        <div>
          <label>Motivasi:</label>
          <textarea
            value={motivasi}
            onChange={(e) => setMotivasi(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Kondisi Rumah:</label>
          <textarea
            value={kondisiRumah}
            onChange={(e) => setKondisiRumah(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pengalaman Memelihara Hewan:</label>
          <textarea
            value={pengalaman}
            onChange={(e) => setPengalaman(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Mengajukan..." : "Ajukan Adopsi"}
        </button>
      </form>
    </div>
  );
};

export default KucingDetail;
