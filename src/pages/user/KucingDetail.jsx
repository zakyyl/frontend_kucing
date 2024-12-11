import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../styles/kucingdetail.css";

const KucingDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [kucing, setKucing] = useState(null);
  const [motivasi, setMotivasi] = useState("");
  const [kondisiRumah, setKondisiRumah] = useState("");
  const [pengalaman, setPengalaman] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Menambahkan state error
  const id_pengguna = useSelector(state => state.auth.id); // Perbaikan: Ambil id pengguna yang benar
  const token = useSelector(state => state.auth.token);
  const [validationErrors, setValidationErrors] = useState({});
  
  useEffect(() => {
    const fetchKucing = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/kucing/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data && response.data.data) {
          setKucing(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching kucing detail:', error);
        setError('Error fetching data.');
      }
    };

    if (id) {
      fetchKucing();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error saat form dikirim
    setValidationErrors({}); // Reset validation errors

    if (!id_pengguna) {
      setError("ID pengguna tidak ditemukan. Pastikan Anda sudah login.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/pengajuan", 
        {
          id_kucing: id,
          id_pengguna,
          status_pengajuan: "pending",
          motivasi,
          kondisi_rumah: kondisiRumah,
          pengalaman_peliharaan: pengalaman,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert("Pengajuan berhasil dibuat!");
      console.log(response.data);
      setMotivasi("");
      setKondisiRumah("");
      setPengalaman("");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Set validation errors dari backend
        setValidationErrors(error.response.data.errors);
      } else {
        console.error("Error creating pengajuan:", error);
        setError("Gagal membuat pengajuan.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>; // Menampilkan pesan error jika ada
  }

  if (!kucing) {
    return <div className="text-center text-xl text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-lightBlue rounded-lg shadow-xl mt-12">
      <h1 className="text-4xl font-bold text-center text-lightPurple mb-6">{kucing.nama}</h1>
      
      <div className="flex justify-center mb-6">
  <img
    src={`http://localhost:3001/uploads/${kucing.foto}`}
    alt={kucing.nama}
    className="w-80 h-80 object-cover rounded-lg border-1 border-lightPurple shadow-lg transition-transform duration-300 transform hover:scale-150"
  />
</div>


      <div className="space-y-4 mb-6">
        <p className="text-lg text-gray-700"><strong>Ras:</strong> {kucing.ras}</p>
        <p className="text-lg text-gray-700"><strong>Jenis Kelamin:</strong> {kucing.jk}</p>
        <p className="text-lg text-gray-700"><strong>Umur:</strong> {kucing.umur} tahun</p>
        <p className="text-lg text-gray-700"><strong>Kondisi:</strong> {kucing.kondisi}</p>
        <p className="text-lg text-gray-700"><strong>Deskripsi:</strong> {kucing.deskripsi}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-lightPurple">Ajukan Adopsi</h2>

        <div className="space-y-2">
  <label className="text-gray-700">Motivasi:</label>
  <textarea
    value={motivasi}
    onChange={(e) => setMotivasi(e.target.value)}
    required
    className={`w-full p-3 border-2 rounded-lg focus:outline-none 
      ${validationErrors.motivasi 
        ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
        : 'border-gray-300 focus:ring-2 focus:ring-lightPurple'}`}
  />
  {validationErrors.motivasi && (
    <p className="text-red-500 text-sm mt-1">
      {validationErrors.motivasi}
    </p>
  )}
</div>

<div className="space-y-2">
      <label className="text-gray-700">Kondisi Rumah:</label>
      <textarea
        value={kondisiRumah}
        onChange={(e) => setKondisiRumah(e.target.value)}
        required
        className={`w-full p-3 border-2 rounded-lg focus:outline-none 
          ${validationErrors.kondisi_rumah 
            ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-2 focus:ring-lightPurple'}`}
      />
      {validationErrors.kondisi_rumah && (
        <p className="text-red-500 text-sm mt-1">
          {validationErrors.kondisi_rumah}
        </p>
      )}
    </div>

    <div className="space-y-2">
      <label className="text-gray-700">Pengalaman Memelihara Hewan:</label>
      <textarea
        value={pengalaman}
        onChange={(e) => setPengalaman(e.target.value)}
        required
        className={`w-full p-3 border-2 rounded-lg focus:outline-none 
          ${validationErrors.pengalaman_peliharaan 
            ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-2 focus:ring-lightPurple'}`}
      />
      {validationErrors.pengalaman_peliharaan && (
        <p className="text-red-500 text-sm mt-1">
          {validationErrors.pengalaman_peliharaan}
        </p>
      )}
    </div>

        <div className="flex justify-center">
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-3 bg-lightPurple text-white rounded-lg shadow-lg hover:bg-lightPink transition-colors duration-300"
          >
            {loading ? "Mengajukan..." : "Ajukan Adopsi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KucingDetail;
