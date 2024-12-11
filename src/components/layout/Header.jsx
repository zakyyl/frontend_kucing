import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth); // Mengakses state auth
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Arahkan ke halaman utama
  };

  return (
    <header className="bg-cream px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-lightPurple cursor-pointer hover:text-lightPink transition duration-300"
          onClick={() => navigate("/")}
        >
          Pawfect Shelter
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-gray-800 font-medium">
            <li>
              <a
                href="/"
                className="hover:text-lightPurple transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
  <a
    href="/about-us"
    className="hover:text-lightPurple transition duration-300"
  >
    About Us
  </a>
</li>
<li>
  <a
    href="/articles"
    className="hover:text-lightPurple transition duration-300"
  >
    Article
  </a>
</li>
            <li>
              <a href="/faq" className="hover:text-lightPurple transition duration-300">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-lightPurple transition duration-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span
                className="text-sm font-medium text-gray-700 bg-cream px-3 py-1 rounded-full"
              >
                {role === "admin" ? "Admin" : "User"}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-lightPink text-white font-medium rounded-md shadow-md hover:bg-pink-500 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-lightPink text-white font-medium rounded-md shadow-md hover:bg-pink-500 transition duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-lightPurple text-white font-medium rounded-md shadow-md hover:bg-purple-500 transition duration-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
