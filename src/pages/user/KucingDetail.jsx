import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import {
  FaCat, FaPaw, FaVenusMars, FaBirthdayCake,
  FaHeartbeat, FaBook, FaHeart,
  FaPaperPlane, FaSpinner, FaComment, FaHome,
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const KucingDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [kucing, setKucing] = useState(null);
  const [motivasi, setMotivasi] = useState('');
  const [kondisiRumah, setKondisiRumah] = useState('');
  const [pengalaman, setPengalaman] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Menambahkan state error
  const id_pengguna = useSelector((state) => state.auth.id); // Perbaikan: Ambil id pengguna yang benar
  const token = useSelector((state) => state.auth.token);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKucing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/kucing/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && response.data.data) {
          setKucing(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching kucing detail:', error);
        setError('Error fetching data.');
      }
    };

    if (id) {
      fetchKucing();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});

    if (!id_pengguna) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ID pengguna tidak ditemukan. Pastikan Anda sudah login.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/pengajuan',
        {
          id_kucing: id,
          id_pengguna,
          status_pengajuan: 'Pending',
          motivasi,
          kondisi_rumah: kondisiRumah,
          pengalaman_peliharaan: pengalaman,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ganti alert biasa dengan SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Pengajuan Berhasil!',
        text: 'Terima kasih telah mengajukan adopsi. Tim kami akan segera meninjau pengajuan Anda.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        background: '#f3e5f5',
        customClass: {
          popup: 'animated bounceIn',
          title: 'text-purple-700',
          content: 'text-gray-600'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/kucinglist');
        }
      });

      console.log(response.data);
      setMotivasi('');
      setKondisiRumah('');
      setPengalaman('');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Tampilkan error validasi dengan SweetAlert
        const errorMessages = Object.values(error.response.data.errors).join('\n');
        Swal.fire({
          icon: 'error',
          title: 'Validasi Gagal',
          text: errorMessages,
          confirmButtonColor: '#d33',
        });
        setValidationErrors(error.response.data.errors);
      } else {
        // Tampilkan error umum
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal membuat pengajuan. Silakan coba lagi.',
          footer: '<a href="#">Hubungi dukungan jika masalah berlanjut</a>'
        });
        console.error('Error creating pengajuan:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>; // Menampilkan pesan error jika ada
  }

  if (!kucing) {
    return <div className="text-center text-xl text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-200 p-8">
        {/* Judul dengan dekorasi kucing */}
        <div className="relative">
          <h1 className="text-4xl font-bold text-center text-lightPurple mb-8 flex justify-center items-center gap-4">
            <FaCat className="text-pink-400 animate-wiggle" />
            {kucing.nama}
            <FaCat className="text-pink-400 animate-wiggle transform scale-x-[-1]" />
          </h1>
        </div>

        {/* Foto Kucing dengan efek menarik */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <img
              src={`http://localhost:3001/uploads/${kucing.foto}`}
              alt={kucing.nama}
              className="w-80 h-80 object-contain rounded-3xl shadow-lg group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Detail Kucing dengan kartu animasi */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-pink-100/50 p-6 rounded-2xl transform transition-all hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-lightPurple mb-4 border-b-2 border-pink-300 pb-2">
              <FaPaw className="inline mr-2 text-pink-400" />
              Informasi Kucing
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Ras', value: kucing.ras, icon: <FaCat className="text-purple-400" /> },
                { label: 'Jenis Kelamin', value: kucing.jk, icon: <FaVenusMars className="text-pink-400" /> },
                { label: 'Umur', value: `${kucing.umur} tahun`, icon: <FaBirthdayCake className="text-blue-400" /> },
                { label: 'Kondisi', value: kucing.kondisi, icon: <FaHeartbeat className="text-red-400" /> }
              ].map((detail, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {detail.icon}
                  <span className="font-medium text-gray-700">{detail.label}: {detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-100/50 p-6 rounded-2xl transform transition-all hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-lightPurple mb-4 border-b-2 border-purple-300 pb-2">
              <FaBook className="inline mr-2 text-purple-400" />
              Deskripsi
            </h3>
            <p className="text-gray-700 italic">{kucing.deskripsi}</p>
          </div>
        </div>

        {/* Form Adopsi dengan desain menarik */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 p-8 rounded-3xl shadow-lg border-2 border-pink-200 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-lightPurple mb-6 flex justify-center items-center gap-3">
            <FaHeart className="text-pink-400 animate-pulse" /> Ajukan Adopsi
          </h2>

          {/* Motivasi */}
          <div className="space-y-2">
            <label className="text-gray-700 font-semibold flex items-center gap-2">
              <FaComment className="text-pink-400" /> Motivasi Adopsi
            </label>
            <textarea
              value={motivasi}
              onChange={(e) => setMotivasi(e.target.value)}
              required
              placeholder="Ceritakan alasan Anda ingin mengadopsi kucing ini..."
              className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all duration-300
                ${validationErrors.motivasi
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-pink-300 focus:ring-2 focus:ring-lightPurple'
                }`}
              rows={4}
            />
            {validationErrors.motivasi && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.motivasi}
              </p>
            )}
          </div>

          {/* Kondisi Rumah */}
          <div className="space-y-2">
            <label className="text-gray-700 font-semibold flex items-center gap-2">
              <FaHome className="text-purple-400" /> Kondisi Rumah
            </label>
            <textarea
              value={kondisiRumah}
              onChange={(e) => setKondisiRumah(e.target.value)}
              required
              placeholder="Deskripsikan lingkungan dan kondisi rumah Anda..."
              className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all duration-300
                ${validationErrors.kondisi_rumah
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-pink-300 focus:ring-2 focus:ring-lightPurple'
                }`}
              rows={4}
            />
            {validationErrors.kondisi_rumah && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.kondisi_rumah}
              </p>
            )}
          </div>

          {/* Pengalaman Memelihara */}
          <div className="space-y-2">
            <label className="text-gray-700 font-semibold flex items-center gap-2">
              <FaPaw className="text-blue-400" /> Pengalaman Memelihara
            </label>
            <textarea
              value={pengalaman}
              onChange={(e) => setPengalaman(e.target.value)}
              required
              placeholder="Ceritakan pengalaman Anda dalam memelihara hewan..."
              className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all duration-300
                ${validationErrors.pengalaman_peliharaan
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-pink-300 focus:ring-2 focus:ring-lightPurple'
                }`}
              rows={4}
            />
            {validationErrors.pengalaman_peliharaan && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.pengalaman_peliharaan}
              </p>
            )} </div>

          {/* Tombol Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full 
              shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 
              transform hover:scale-105 flex items-center gap-3"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Mengajukan...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Ajukan Adopsi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KucingDetail;
