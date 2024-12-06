import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../styles/kucinglist.css";

const KucingList = () => {
  const [kucings, setKucings] = useState([]);
  const [loading, setLoading] = useState(true); // Menambahkan state loading
  const [error, setError] = useState(null); // Menambahkan state error

  useEffect(() => {
    const fetchKucings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/kucing');
        if (response.data && Array.isArray(response.data.data)) {
          setKucings(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          setKucings([]);
        }
      } catch (error) {
        console.error('Error fetching kucing data:', error);
        setKucings([]);
        setError('Failed to load pets. Please try again later.'); // Menangani error
      } finally {
        setLoading(false); // Set loading ke false setelah data selesai diambil
      }
    };
    fetchKucings();
  }, []);

  return (
    <div className="find-pet-container">
      <h1>Find Your Perfect Pet</h1>
      
      {loading ? (
        <p>Loading...</p> // Menampilkan loading saat data belum selesai dimuat
      ) : error ? (
        <p className="error-message">{error}</p> // Menampilkan pesan error jika terjadi kesalahan
      ) : (
        <div className="card-container">
          {kucings.length === 0 ? (
            <p>No pets available at the moment.</p> // Pesan jika tidak ada data
          ) : (
            kucings.map((kucing) => (
              <Link to={`/kucingdetail/${kucing.id}`} key={kucing.id} className="card-link">
                <div className="card">
                  <img
                    src={kucing.foto ? `http://localhost:3001/uploads/${kucing.foto}` : 'path_to_default_image.jpg'} // Fallback image jika foto tidak ada
                    alt={kucing.nama}
                    className="card-img"
                  />
                  <div className="card-content">
                    <h3>{kucing.nama}</h3>
                    <p><strong>Ras:</strong> {kucing.ras}</p>
                    <p><strong>Jenis Kelamin:</strong> {kucing.jk}</p>
                    <p><strong>Umur:</strong> {kucing.umur} tahun</p>
                    <p><strong>Kondisi:</strong> {kucing.kondisi}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default KucingList;
