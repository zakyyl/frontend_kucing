import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { login } from "../../redux/authSlice"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { jwtDecode } from 'jwt-decode';  // Menggunakan ekspor yang benar
import "../../styles/auth.css"; 

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Selalu menggunakan endpoint admin
      const endpoint = "http://localhost:3001/api/auth/admin/login";
  
      const response = await axios.post(endpoint, { email, password });
  
      setSuccess(response.data.message); 
      setError(""); 
  
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", "admin"); // Selalu set role sebagai admin
      
      // Decode token untuk mendapatkan ID
      const decoded = jwtDecode(token);  // Gunakan jwtDecode, bukan jwt_decode
      const userId = decoded.id; // Mengambil ID dari token yang didekodekan

      // Dispatch ke Redux dengan token dan ID
      dispatch(
        login({
          token,
          role: "admin",  // Mengirimkan role sebagai admin
          id: userId,  // Mengirimkan ID pengguna
        })
      );
  
      console.log("Token stored:", localStorage.getItem("token"));
  
      // Selalu navigasi ke dashboard admin
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
    }
  };

};

export default LoginAdmin;