import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../../styles/userdashboard.css"; // Import CSS khusus untuk UserDashboard
import petImage from "../../assets/images/pet.jpg"; // Gambar yang digunakan di hero

const UserDashboard = () => {
  const { token, role } = useSelector((state) => state.auth); // Mengambil token dan role dari Redux
  const navigate = useNavigate();

  useEffect(() => {
    // Memeriksa apakah token tidak ada atau role bukan user, maka arahkan ke login
    if (!token || role !== 'user') {
      navigate('/login');
    }
  }, [token, role, navigate]); // Menggunakan token dan role sebagai dependency untuk navigasi

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Your Dashboard, <span>User</span>!</h1>
        {token && role === 'user' ? (
          <div>
            <p>Your token: {token}</p>
            <button className="view-pets-btn" onClick={() => navigate('/kucinglist')}>Find a Pet</button>
          </div>
        ) : (
          <p>Please log in to view your dashboard.</p>
        )}
      </div>
      <div className="hero-image">
        <img src={petImage} alt="Happy Pet" />
      </div>
    </section>
  );
};

export default UserDashboard;
