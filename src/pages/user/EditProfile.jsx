import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { updateUser } from '../../redux/authSlice';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');

    const [userData, setUserData] = useState({
        nama: localStorage.getItem('nama') || '',
        alamat: '',
        email: '',
        no_telepon: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!token || !userId) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Akses Ditolak',
                        text: 'Silakan login terlebih dahulu',
                        confirmButtonText: 'Login'
                    }).then(() => navigate('/login'));
                    return;
                }

                const response = await axios.get(`http://localhost:3001/api/v1/pengguna/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                // Log response untuk debugging
                console.log('Fetch User Profile Response:', {
                    status: response.status,
                    data: response.data,
                    headers: response.headers
                });

                const { nama, alamat, email, no_telepon } = response.data.data;
                setUserData({
                    nama,
                    alamat: alamat || '',
                    email,
                    no_telepon: no_telepon || ''
                });
            } catch (error) {
                console.error('Error fetching user profile:', {
                    errorResponse: error.response,
                    errorMessage: error.message
                });

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Memuat Profil',
                    text: error.response?.data?.message || 'Terjadi kesalahan saat memuat data'
                });
            }
        };

        fetchUserProfile();
    }, [token, userId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Konfirmasi sebelum update
        const confirmResult = await Swal.fire({
            icon: 'question',
            title: 'Konfirmasi Update Profil',
            text: 'Apakah Anda yakin ingin memperbarui profil?',
            showCancelButton: true,
            confirmButtonText: 'Ya, Update',
            cancelButtonText: 'Batal'
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const response = await axios.put(
                `http://localhost:3001/api/v1/pengguna/${userId}`,
                {
                    nama: userData.nama,
                    email: userData.email,
                    no_telepon: userData.no_telepon,
                    alamat: userData.alamat
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Log response untuk debugging
            console.log('Update Profile Response:', {
                status: response.status,
                data: response.data,
                headers: response.headers
            });

            // Cek apakah update berhasil
            if (response.status === 200 || response.status === 201) {
                // Update berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Profil Berhasil Diperbarui',
                    text: 'Data profil Anda telah diupdate',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    // Update localStorage
                    localStorage.setItem('nama', userData.nama);

                    // Update Redux state
                    dispatch(updateUser({
                        nama: userData.nama
                    }));

                    navigate('/user/dashboard');
                });
            } else {
                // Jika status tidak sesuai
                throw new Error('Update tidak berhasil');
            }
        } catch (error) {
            // Log error detail
            console.error('Error updating profile:', {
                errorResponse: error.response,
                errorMessage: error.message
            });

            // Tangani error
            Swal.fire({
                icon: 'error',
                title: 'Gagal Update Profil',
                text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui profil'
            });
        }
    };

    // Jika tidak ada token, redirect ke login
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
                    Edit Profil 🐱
                </h2>
    
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="nama"
                        value={userData.nama}
                        onChange={handleInputChange}
                        placeholder="Nama Lengkap"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="tel"
                        name="no_telepon"
                        value={userData.no_telepon}
                        onChange={handleInputChange}
                        placeholder="Nomor Telepon"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                        name="alamat"
                        value={userData.alamat}
                        onChange={handleInputChange}
                        placeholder="Alamat"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="3"
                    />
    
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 transition-colors"
                        >
                            Simpan Perubahan
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/user/dashboard')}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full hover:bg-gray-300 transition-colors"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;