import { useState } from 'react';
import axios from 'axios'; // Untuk request API
import { useNavigate } from 'react-router-dom'; // Untuk navigasi


const Register = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noTelepon, setNoTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [error, setError] = useState(''); // Untuk menampilkan error
  const [success, setSuccess] = useState(''); // Untuk menampilkan pesan sukses
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/user/register',
        {
          nama,
          email,
          password,
          no_telepon: noTelepon,
          alamat,
        }
      );

      // Jika registrasi berhasil
      setSuccess(response.data.message); // Tampilkan pesan sukses
      setError(''); // Hapus pesan error jika ada

      // Arahkan pengguna ke halaman login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      // Tampilkan pesan error jika registrasi gagal
      setError(err.response?.data?.message || 'Registrasi gagal');
      setSuccess(''); // Hapus pesan sukses jika ada
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 via-purple-200 to-blue-100 p-4">
      <div className="relative w-full max-w-md">
        {/* Kucing lucu di sudut kanan bawah */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 transform -rotate-12">
          <img
            src="https://png.pngtree.com/png-clipart/20230405/original/pngtree-kitty-cute-cat-sticker-cartoon-clipart-png-image_9027478.png"
            alt="Cute Cat"
            className="w-full h-full object-cover rounded-full shadow-2xl border-8 border-white/50 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Kartu Register */}
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl relative z-10 border-4 border-pink-200">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-['Comfortaa'] font-bold text-lightPurple flex items-center justify-center gap-3">
              <span>🐱</span>
              Register
              <span>✨</span>
            </h2>
            <p className="text-gray-500 mt-2 font-['Quicksand']">
              Bergabunglah dengan keluarga kucing kami!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Nama Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lightPurple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lightPurple transition duration-300"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lightPurple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lightPurple transition duration-300"
              />
            </div>

            {/* Password Input */}
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
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lightPurple transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-lightPurple"
                >
                  {showPassword ? "👀" : "🙈"}
                </button>
              </div>
            </div>

            {/* Nomor Telepon Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lightPurple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6. ```jsx
      105l.773-1.548a1 1 0 011.06-.54l4.435.74A1 1 0 0117 15.847V18a1 1 0 01-1 1H3a1 1 0 01-1-1v-2.153a1 1 0 01.836-.986l4.435-.74a1 1 0 01.54 1.06l-.773 1.548a11.037 11.037 0 01-6.105-6.105l1.548-.773a1 1 0 011.06-.54l4.435.74A1 1 0 0110 3H3a1 1 0 01-1-1z" />
                </svg>
                Nomor Telepon
              </label>
              <input
                type="text"
                placeholder="Masukkan nomor telepon"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lightPurple transition duration-300"
              />
            </div>

            {/* Alamat Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lightPurple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 00-8 8c0 4.418 8 10 8 10s8-5.582 8-10a8 8 0 00-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
                Alamat
              </label>
              <input
                type="text"
                placeholder="Masukkan alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lightPurple transition duration-300"
              />
            </div>

            {/* Tombol Register */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-lightPurple to-pink-400 text-white rounded-full shadow-lg hover:scale-105 transition duration-300 transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>🐾</span>
                Register
                <span>🚀</span>
              </button>
            </div>
          </form>

          {error && <p className="text-center text-red-500">{error}</p>}
          {success && <p className="text-center text-green-500">{success}</p>}
          <p className="text-center mt-4">
            Sudah punya akun? <a href="/login" className="text-lightPurple underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
