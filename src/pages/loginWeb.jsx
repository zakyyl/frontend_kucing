import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { login } from "../redux/authSlice"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { jwtDecode } from 'jwt-decode';  
import "../styles/auth.css"; 

const LoginWeb = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Coba login sebagai user terlebih dahulu
      let response;
      let role = "user";
      let endpoint = "http://localhost:3001/api/auth/user/login";

      try {
        response = await axios.post(endpoint, { email, password });
      } catch (userLoginError) {
        // Jika login user gagal, coba login sebagai admin
        endpoint = "http://localhost:3001/api/auth/admin/login";
        role = "admin";
        response = await axios.post(endpoint, { email, password });
      }
  
      setSuccess(response.data.message); 
      setError(""); 
  
      const token = response.data.token;
      localStorage.setItem("token", token);
      
      // Decode token untuk mendapatkan ID
      const decoded = jwtDecode(token);
      const userId = decoded.id; 

      // Simpan role di localStorage
      localStorage.setItem("role", role); 
      
      // Dispatch ke Redux dengan token dan ID
      dispatch(
        login({
          token,
          role,  // Mengirimkan role
          id: userId,  // Mengirimkan ID pengguna
        })
      );
  
      console.log("Token stored:", localStorage.getItem("token"));
  
      // Navigasi berdasarkan role
      if (role === "admin") {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-pink-500 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-lightPurple">Login</h2>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightPurple"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightPurple"
            />
          </div>

          <div className="flex justify-center">
            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-lightPurple text-white rounded-lg shadow-lg hover:bg-lightPink transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
        
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default LoginWeb;
