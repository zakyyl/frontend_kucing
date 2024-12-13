import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const LoginWeb = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response;
      let role = 'user';
      let endpoint = 'http://localhost:3001/api/auth/user/login';

      try {
        response = await axios.post(endpoint, { email, password });
      } catch (userLoginError) {
        endpoint = 'http://localhost:3001/api/auth/admin/login';
        role = 'admin';
        response = await axios.post(endpoint, { email, password });
      }

      setSuccess(response.data.message);
      setError('');

      const token = response.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      localStorage.setItem('role', role);

      dispatch(
        login({
          token,
          role,
          id: userId, 
        })
      );

      console.log('Token stored:', localStorage.getItem('token'));

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 via-purple-200 to-blue-100 p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-20 -left-20 w-64 h-64 transform rotate-12">
          <img
            src="https://png.pngtree.com/png-clipart/20230405/original/pngtree-kitty-cute-cat-sticker-cartoon-clipart-png-image_9027478.png"
            alt="Cute Cat"
            className="w-full h-full object-cover rounded-full shadow-2xl border-8 border-white/50 hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl relative z-10 border-4 border-pink-200">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-['Comfortaa'] font-bold text-lightPurple flex items-center justify-center gap-3">
              <span>🐱</span>
              Login
              <span>🔑</span>
            </h2>
            <p className="text-gray-500 mt-2 font-['Quicksand']">
              Selamat datang, teman kucing!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lightPurple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Masukkan email kamu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-10 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lightPurple transition duration-300"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.4A4 4 0 1114 10a1 1 0 102 0c0-1.636-.87-3.088-2.122-3.879z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lightPurple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password kamu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-10 pr-12 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lightPurple transition duration-300"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-lightPurple"
                >
                  {showPassword ? "👀" : "🙈"}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-lightPurple to-pink-400 text-white rounded-full shadow-lg hover:scale-105 transition duration-300 transform active:scale-95 flex items-center justify-center gap-2"
              > <span>🐾</span>
                Login
                <span>🚀</span>
              </button>
            </div>
          </form>


          {error && <p className="text-center text-red-500">{error}</p>}
          {success && <p className="text-center text-green-500">{success}</p>}


        </div>
      </div>
    </div>
  );
};


export default LoginWeb;
