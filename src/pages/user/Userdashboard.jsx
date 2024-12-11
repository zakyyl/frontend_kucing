import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPengajuanByUserId } from "../../redux/pengajuanSlice";
import "../../styles/userdashboard.css";
import petImage from "../../assets/images/pet.jpg"; // Gambar default

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [namapengguna, setNamaPengguna] = useState("");

  // Ambil token dan data dari localStorage
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');

  const pengajuan = useSelector((state) => state.pengajuan);

  useEffect(() => {
    if (!token || role !== "user") {
      navigate("/login");
    } else {
      dispatch(fetchPengajuanByUserId(id)).then((response) => {
        // Cek apakah ada data pengajuan dan ada nama pengguna
        if (response.payload && response.payload.length > 0) {
          // Ambil nama pengguna dari data pertama pengajuan
          const namaDariPengajuan = response.payload[0].Pengguna?.nama || response.payload[0].nama_lengkap || "Pengguna";
          setNamaPengguna(namaDariPengajuan);
        }
      }); // Ambil pengajuan berdasarkan ID pengguna
    }
  }, [token, role, id, dispatch, navigate]);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-lightBlue">
      {/* Left Content */}
      <div className="text-center md:text-left md:w-1/2">
        <h1 className="text-4xl font-bold text-lightPurple mb-6">
          Welcome to Your Dashboard, <span className="text-darkPurple">{namapengguna}</span>!
        </h1>
        
        {token && role === "user" ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">Your ID: <span className="font-bold">{id}</span></p>
            <button
              className="px-6 py-3 bg-lightPink text-white text-lg font-medium rounded-full shadow-lg hover:bg-pink-500 transition duration-300"
              onClick={() => navigate("/kucinglist")}
            >
              🐾 Find a Pet 🐾
            </button>
          </div>
        ) : (
          <p className="text-lg text-gray-600">Please log in to view your dashboard.</p>
        )}

        {/* Menampilkan daftar pengajuan */}
        {pengajuan.status === "loading" && <p>Loading...</p>}
        {pengajuan.status === "failed" && <p className="text-red-500">{pengajuan.error}</p>}
        {pengajuan.status === "succeeded" && (
          <div className="mt-8 space-y-4">
            {pengajuan.data.map((item) => (
              <div key={item.id_pengajuan} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-lightPink rounded-full overflow-hidden">
                    <img
                      src={item.Kucing.foto ? `http://localhost:3001/${item.Kucing.foto}` : petImage}
                      alt={item.Kucing.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.Kucing.nama}</h3>
                    <p className="text-sm text-gray-500">Status: {item.status_pengajuan}</p>
                    <p className="text-gray-600">Motivasi: {item.motivasi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Image */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img src={petImage} alt="Happy Pet" className="rounded-full shadow-lg w-3/4 h-auto object-cover" />
      </div>
    </section>
  );
};

export default UserDashboard;
