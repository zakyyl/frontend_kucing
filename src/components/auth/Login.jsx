import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { login } from "../../redux/authSlice"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { jwtDecode } from 'jwt-decode';  // Menggunakan ekspor yang benar
import "../../styles/auth.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const endpoint =
        email.endsWith("@admin.com")
          ? "http://localhost:3001/api/auth/admin/login"
          : "http://localhost:3001/api/auth/user/login";
  
      const response = await axios.post(endpoint, { email, password });
  
      setSuccess(response.data.message); 
      setError(""); 
  
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", email.endsWith("@admin.com") ? "admin" : "user");
      
      // Decode token untuk mendapatkan ID
      const decoded = jwtDecode(token);  // Gunakan jwtDecode, bukan jwt_decode
      const userId = decoded.id; // Mengambil ID dari token yang didekodekan

      // Dispatch ke Redux dengan token dan ID
      dispatch(
        login({
          token,
          role: email.endsWith("@admin.com") ? "admin" : "user",
          id: userId,  // Mengirimkan ID pengguna
        })
      );
  
      console.log("Token stored:", localStorage.getItem("token"));
  
      if (email.endsWith("@admin.com")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
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
