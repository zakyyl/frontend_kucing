import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../styles/kucinglist.css";

const KucingList = () => {
  const [kucings, setKucings] = useState([]);

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
      }
    };
    fetchKucings();
  }, []);

  return (
    <div className="find-pet-container">
      <h1>Find Your Perfect Pet</h1>
      <div className="card-container">
        {kucings.map((kucing) => (
          <Link to={`/kucingdetail/${kucing.id}`} key={kucing.id} className="card-link">
            <div className="card">
              <img
                src={`http://localhost:3001/uploads/${kucing.foto}`}
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
        ))}
      </div>
    </div>
  );
};

export default KucingList;
