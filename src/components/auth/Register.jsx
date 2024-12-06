import React, { useState } from "react";
import axios from "axios"; // Untuk request API
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import "../../styles/auth.css"; // Mengimpor styling

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [error, setError] = useState(""); // Untuk menampilkan error
  const [success, setSuccess] = useState(""); // Untuk menampilkan pesan sukses
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/auth/user/register", {
        nama,
        email,
        password,
        no_telepon: noTelepon,
        alamat,
      });

      // Jika registrasi berhasil
      setSuccess(response.data.message); // Tampilkan pesan sukses
      setError(""); // Hapus pesan error jika ada

      // Arahkan pengguna ke halaman login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Tampilkan pesan error jika registrasi gagal
      setError(err.response?.data?.message || "Registrasi gagal");
      setSuccess(""); // Hapus pesan sukses jika ada
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={noTelepon}
            onChange={(e) => setNoTelepon(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-btn">
          Register
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <p className="auth-footer">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
