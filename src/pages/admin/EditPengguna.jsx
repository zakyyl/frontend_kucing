import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setEditSuccess } from '../../redux/store';
import Swal from 'sweetalert2'; // Tambahkan SweetAlert

const EditPengguna = () => {
  const { id } = useParams();
  const [pengguna, setPengguna] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPengguna = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/pengguna/${id}`
        );
        setPengguna(response.data.data);
      } catch (error) {
        console.error('Error fetching pengguna data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal mengambil data pengguna!',
        });
      }
    };

    fetchPengguna();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPengguna({
      ...pengguna,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/v1/pengguna/${id}`, pengguna);
      dispatch(setEditSuccess(true));
      
      // Gunakan SweetAlert untuk konfirmasi
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data pengguna berhasil diperbarui',
        showConfirmButton: false,
        timer: 1500
      });

      const response = await axios.get('http://localhost:3001/api/v1/pengguna');
      const penggunaData = response.data.data;

      navigate('/tabel/pengguna', { state: { penggunaData } });
    } catch (error) {
      console.error('Error updating pengguna:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat memperbarui data pengguna!',
      });
    }
  };

  // Loading state dengan desain lucu
  if (pengguna === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
        <div className="text-center">
          <div className="animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-24 h-24 mx-auto text-pink-500"
            >
              <path 
                fill="currentColor" 
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
              />
            </svg>
          </div>
          <p className="mt-4 text-xl text-pink-600 font-semibold">
            Memuat data pengguna... 🐱
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 mr-2 text-pink-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
              clipRule="evenodd" 
            />
          </svg>
          Edit Pengguna 🐾
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Nama */}
          <div>
            <label 
              htmlFor="nama" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama 🏷️
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={pengguna.nama || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
            />
          </div>

          {/* Input Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email 📧
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={pengguna.email || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
            />
          </div>

          {/* Input No Telepon */}
          <div>
            <label 
              htmlFor="no_telepon" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              No Telepon 📱
            </label>
            <input
              type="text"
              id="no_telepon"
              name="no_telepon"
              value={pengguna.no_telepon || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
            />
          </div>

                    {/* Input Alamat */}
                    <div>
            <label 
              htmlFor="alamat" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alamat 🏠
            </label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={pengguna.alamat || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
            />
          </div>

          {/* Tombol Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg 
              hover:bg-pink-600 transition duration-300 ease-in-out 
              transform hover:-translate-y-1 hover:scale-105 
              flex items-center justify-center space-x-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" 
                />
              </svg>
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>

        {/* Tombol Kembali */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/tabel/pengguna')}
            className="text-pink-500 hover:text-pink-700 
            flex items-center justify-center w-full 
            space-x-2 transition duration-300 ease-in-out"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Kembali ke Tabel Pengguna</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPengguna;