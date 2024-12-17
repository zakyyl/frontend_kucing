import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPengajuanByUserId } from '../../redux/pengajuanSlice';
import catDashboard from '../../assets/images/pawfet.png';
import catWaving from '../../assets/images/cat-waving.gif';
import Swal from "sweetalert2";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [namapengguna, setNamaPengguna] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [selectedPengajuan, setSelectedPengajuan] = useState(null);
  const handlePengajuanDetail = (pengajuan) => {
    setSelectedPengajuan(pengajuan);
  };

  const closeModal = () => {
    setSelectedPengajuan(null);
  };
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');

  const pengajuan = useSelector((state) => state.pengajuan);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) setTimeOfDay('Pagi');
    else if (currentHour < 18) setTimeOfDay('Siang');
    else setTimeOfDay('Malam');

    if (!token || role !== 'user') {
      navigate('/login');
    } else {
      dispatch(fetchPengajuanByUserId(id)).then((response) => {
        if (response.payload && response.payload.length > 0) {
          const namaDariPengajuan =
            response.payload[0].Pengguna?.nama ||
            response.payload[0].nama_lengkap ||
            'Pengguna';
          setNamaPengguna(namaDariPengajuan);
        }
      });
    }
  }, [token, role, id, dispatch, navigate]);
  const handleDelete = (idPengajuan) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/api/v1/pengajuan/${idPengajuan}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        })
          .then((response) => {
            console.log("Delete response:", response);
            if (!response.ok) {
              throw new Error("Gagal menghapus pengajuan.");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Delete success:", data); 
            Swal.fire({
              title: "Terhapus!",
              text: data.message,
              icon: "success",
            });
            setSelectedPengajuan(null);
            dispatch(fetchPengajuanByUserId(id));
          })
          .catch((error) => {
            console.error("Error saat menghapus:", error); 
            Swal.fire({
              title: "Gagal!",
              text: "Terjadi kesalahan saat menghapus pengajuan.",
              icon: "error",
            });
          });

      }
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div>
            <h1 className="text-4xl font-['Comfortaa'] font-bold text-lightPurple flex justify-center items-center gap-3">
              <img
                src={catWaving}
                alt="Waving Cat"
                className="w-16 h-16 rounded-full"
              />
              Selamat {timeOfDay}, <span className="text-pink-500">{namapengguna} !!</span>
              <img
                src={catWaving}
                alt="Waving Cat"
                className="w-16 h-16 rounded-full"
              />
            </h1>
            <p className="text-gray-600 mt-2">
              Siap untuk petualangan kucing hari ini?
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate('/kucinglist')}
              className="mx-auto bg-lightPink text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              🐾 Cari Teman Kucing
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-lightPurple">
                Informasi Pengguna 👤
              </h2>
              <button
                onClick={() => navigate('/edit-profile')}
                className="text-sm bg-lightPink text-white px-3 py-1 rounded-full hover:bg-pink-600 transition-colors"
              >
                ✏️ Edit Profil
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-100 rounded-xl p-4">
                <p className="text-gray-700">
                  <strong>ID Pengguna:</strong> {id}
                </p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-4">
                <p className="text-gray-700">
                  <strong>Nama Pengguna:</strong> {namapengguna}
                </p>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-gray-700">
                  <strong>Total Pengajuan:</strong> {pengajuan.data?.length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={catDashboard}
              alt="Cute Cat"
              className="w-full max-w-md object-cover hover:scale-105 transition-transform"
            />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-lightPurple mb-4">
              Daftar Pengajuan Adopsi 🏠
            </h2>

            {pengajuan.status === 'loading' && (
              <div className="text-center">
                <p>Mencari kucing...</p>
              </div>
            )}

            {pengajuan.status === 'succeeded' && pengajuan.data.length === 0 && (
              <div className="text-center">
                <p>Belum ada pengajuan adopsi</p>
              </div>
            )}

            {pengajuan.status === 'succeeded' && (
              <div className="space-y-4">
                {pengajuan.data.map((item) => (
                  <div
                    key={item.id_pengajuan}
                    onClick={() => handlePengajuanDetail(item)}
                    className="bg-pink-100 rounded-xl p-4 flex items-center space-x-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white flex items-center justify-center">
                      <img
                        src={
                          item.Kucing.foto
                            ? `http://localhost:3001/${item.Kucing.foto}`
                            : catDashboard
                        }
                        alt={item.Kucing.nama}
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {item.Kucing.nama}
                      </h3>
                      <p className="font-medium">
                        <span className="text-black">Status:</span>{' '}
                        <span className={
                          item.status_pengajuan === 'Berhasil'
                            ? 'text-green-600'
                            : item.status_pengajuan === 'Rejected'
                              ? 'text-red-600'
                              : item.status_pengajuan === 'Pending'
                                ? 'text-yellow-400'
                                : 'text-gray-600'
                        }>
                          {item.status_pengajuan}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedPengajuan && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-500"
                >
                  &times;
                </button>

                <h2 className="text-2xl font-bold text-lightPurple mb-6">
                  Detail Pengajuan Adopsi
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <img
                      src={
                        selectedPengajuan.Kucing.foto
                          ? `http://localhost:3001/${selectedPengajuan.Kucing.foto}`
                          : catDashboard
                      }
                      alt={selectedPengajuan.Kucing.nama}
                      className="w-48 h-48 object-contain bg-white rounded-full border-4 border-pink-200"
                    />
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {selectedPengajuan.Kucing.nama}
                    </h3>
                    <p>
                      <span className="text-black font-medium">Status:</span>
                      <span className={`ml-2 ${selectedPengajuan.status_pengajuan === 'Berhasil'
                        ? 'text-green-600'
                        : selectedPengajuan.status_pengajuan === 'Rejected'
                          ? 'text-red-600'
                          : selectedPengajuan.status_pengajuan === 'Pending'
                            ? 'text-yellow-600'
                            : 'text-gray-600'
                        }`}>
                        {selectedPengajuan.status_pengajuan}
                      </span>
                    </p>
                  </div>

                  {/* Detail Pengajuan */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p>
                      <strong>Tanggal Pengajuan:</strong>{' '}
                      {new Date(selectedPengajuan.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Alasan Adopsi:</strong>{' '}
                      {selectedPengajuan.motivasi || 'Tidak ada keterangan'}
                    </p>
                  </div>

                  {/* Tombol Delete jika Status Pending */}
                  {selectedPengajuan.status_pengajuan === 'Pending' && (
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleDelete(selectedPengajuan.id_pengajuan)}
                        className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        Batalkan Pengajuan
                      </button>
                    </div>
                  )}
                </div>


              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;