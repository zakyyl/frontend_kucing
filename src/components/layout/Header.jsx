import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Articles', path: '/articles' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md px-4 py-3 shadow-2xl sticky top-0 z-50 rounded-b-[50px]">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo dengan desain melengkung */}
        <div
          className="flex items-center space-x-3 cursor-pointer transform hover:scale-105 transition duration-300 bg-lightPurple/10 px-4 py-2 rounded-full"
          onClick={() => navigate('/')}
        >
          <span className="text-3xl drop-shadow-md">🐾</span>
          <h1 className="text-2xl font-['Comfortaa'] font-bold text-lightPurple tracking-wider">
            Pawfect Shelter
          </h1>
        </div>

        {/* Desktop Navigation dengan tipografi menarik */}
        <nav className="hidden md:flex space-x-6 items-center">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="font-['Quicksand'] text-lg font-semibold text-gray-700 
              relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 
              after:h-1 after:bg-lightPurple after:transition-all after:duration-300 
              hover:after:w-full hover:text-lightPurple transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Authentication Buttons dengan desain melengkung */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-lightBlue/20 rounded-full px-3 py-1">
                <span className="animate-bounce text-xl">
                  {role === 'admin' ? '👑' : '👤'}
                </span>
                <span className="font-['Quicksand'] text-sm font-medium text-gray-700">
                  {role === 'admin' ? 'Admin' : 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gradient-to-r from-lightPink to-pink-400 
                text-white font-['Comfortaa'] font-bold rounded-full 
                shadow-lg hover:scale-105 transition duration-300 
                hover:shadow-xl active:scale-95"
              >
                Logout 👋
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-gradient-to-r from-lightPink to-pink-400 
                text-white font-['Comfortaa'] font-bold rounded-full 
                shadow-lg hover:scale-105 transition duration-300 
                hover:shadow-xl active:scale-95"
              >
                Login 🔑
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-gradient-to-r from-lightPurple to-purple-400 
                text-white font-['Comfortaa'] font-bold rounded-full 
                shadow-lg hover:scale-105 transition duration-300 
                hover:shadow-xl active:scale-95"
              >
                Sign Up 🐱
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl focus:outline-none bg-lightBlue/20 rounded-full p-2"
          >
            {isMenuOpen ? '✖️' : '☰'}
          </button>
        </div>

        {/* Mobile Menu dengan desain melengkung */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl md:hidden rounded-b-[30px] overflow-hidden">
            <nav className="flex flex-col space-y-2 p-4">
              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="font-['Quicksand'] text-gray-700 
                  hover:bg-lightPurple/10 px-4 py-3 rounded-full 
                  transition duration-300 text-center"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;