import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Menggunakan dispatch dari Redux
import { login } from "../../redux/authSlice"; // Menggunakan action login
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import axios from "axios"; // Menggunakan axios untuk request API
import "../../styles/auth.css"; // Mengimpor styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Untuk menampilkan error
  const [success, setSuccess] = useState(""); // Untuk menampilkan pesan sukses
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Mendapatkan fungsi navigate

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Tentukan endpoint berdasarkan domain email
      const endpoint =
        email.endsWith("@admin.com")
          ? "http://localhost:3001/api/auth/admin/login"
          : "http://localhost:3001/api/auth/user/login";
  
      const response = await axios.post(endpoint, { email, password });
  
      // Jika berhasil login
      setSuccess(response.data.message); // Tampilkan pesan sukses
      setError(""); // Hapus pesan error jika ada
  
      // Simpan token JWT di localStorage dan Redux
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", email.endsWith("@admin.com") ? "admin" : "user");
  
      dispatch(
        login({
          token: response.data.token,
          role: email.endsWith("@admin.com") ? "admin" : "user",
        })
      );
  
      // Verifikasi bahwa token sudah tersimpan dan navigasi dipanggil
      console.log("Token stored:", localStorage.getItem("token"));
  
      // Redirect sesuai role setelah login
      if (email.endsWith("@admin.com")) {
        console.log("Redirecting to admin dashboard...");
        navigate("/admin/dashboard"); // Redirect ke admin dashboard
      } else {
        console.log("Redirecting to user dashboard...");
        navigate("/user/dashboard"); // Redirect ke user dashboard
      }
    } catch (err) {
      // Tampilkan pesan error jika login gagal
      setError(err.response?.data?.message || "Login failed");
      setSuccess(""); // Hapus pesan sukses jika ada
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
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
        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Login;
