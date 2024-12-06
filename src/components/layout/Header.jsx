import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../../styles/header.css";

const Header = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth); // Mengakses state auth
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Arahkan ke halaman utama
  };

  return (
    <header className="header">
      <div className="logo">Pet Foster</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#pets">Pets</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {isLoggedIn ? (
        <div className="auth-links">
          <span>{role === "admin" ? "Admin" : "User"}</span>
          <button className="contact-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button className="contact-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="contact-btn" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
