import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const TabelPengajuan = () => {
  const location = useLocation();
  const { pengajuanData: initialData } = location.state || {};
  const [pengajuanData, setPengajuanData] = useState(initialData || []);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Semua');



  const filteredAndSortedData = [...pengajuanData]
    .sort((a, b) => new Date(b.tanggal_pengajuan) - new Date(a.tanggal_pengajuan))
    .filter(pengajuan =>
      filterStatus === 'Semua' || pengajuan.status_pengajuan === filterStatus
    );
  const statusOptions = [
    { value: 'Pending', color: 'bg-yellow-300 text-yellow-800' },
    { value: 'Berhasil', color: 'bg-green-300 text-green-800' },
    { value: 'Rejected', color: 'bg-red-300 text-red-800' },
  ];

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (newStatus === 'Berhasil') {
        const result = await Swal.fire({
          title: 'Konfirmasi Adopsi',
          text: 'Apakah Anda yakin ingin mengubah status menjadi Berhasil?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Ubah Status!',
          cancelButtonText: 'Batal'
        });

        if (!result.isConfirmed) {
          return; // Batalkan jika pengguna memilih "Batal"
        }
      }

      // Kirim permintaan untuk memperbarui status ke server
      await axios.put(`http://localhost:3001/api/v1/pengajuan/${id}`, {
        status_pengajuan: newStatus,
      });

      // Perbarui status di tabel
      const updatedPengajuan = pengajuanData.map((pengajuan) =>
        pengajuan.id_pengajuan === id
          ? { ...pengajuan, status_pengajuan: newStatus }
          : pengajuan
      );

      setPengajuanData(updatedPengajuan); // Update data state di tabel
      setActiveDropdown(null); // Tutup dropdown setelah selesai

      // Tampilkan notifikasi sukses
      Swal.fire({
        title: 'Berhasil!',
        text: 'Status pengajuan telah diperbarui.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error updating status:', error);

      // Tampilkan notifikasi error
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat memperbarui status',
        icon: 'error',
        confirmButtonText: 'Tutup'
      });
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Data Pengajuan
      </h2>

      {/* Filter Status */}
      <div className="flex justify-center mb-6">
        <div className="bg-white shadow rounded-lg p-2 flex gap-2">
          {['Semua', ...statusOptions.map(status => status.value)].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${filterStatus === status
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-pink-100'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredAndSortedData.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-pink-200 text-pink-800 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">Detail</th>
                <th className="py-3 px-4 text-left">Kucing</th>
                <th className="py-3 px-4 text-left">Pengguna</th>
                <th className="py-3 px-4 text-left">Tanggal</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredAndSortedData.map((pengajuan, index) => (
                <>
                  <tr
                    key={pengajuan.id_pengajuan}
                    className={`${index % 2 === 0 ? 'bg-purple-50' : 'bg-blue-50'} 
                      border-b border-gray-200 hover:bg-blue-100`}
                  >
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleRowExpand(pengajuan.id_pengajuan)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {expandedRow === pengajuan.id_pengajuan ? '▼' : '►'}
                      </button>
                    </td>
                    <td className="py-3 px-4">{pengajuan.Kucing?.nama || 'N/A'}</td>
                    <td className="py-3 px-4">{pengajuan.Pengguna?.nama || 'N/A'}</td>
                    <td className="py-3 px-4">
                      {new Date(pengajuan.tanggal_pengajuan).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === pengajuan.id_pengajuan
                                ? null
                                : pengajuan.id_pengajuan
                            )
                          }
                          className={`py-1 px-3 rounded-full ${statusOptions.find(
                            (status) =>
                              status.value === pengajuan.status_pengajuan
                          )?.color || 'bg-gray-300 text-gray-800'
                            }`}
                        >
                          {pengajuan.status_pengajuan}
                        </button>
                        {activeDropdown === pengajuan.id_pengajuan && (
                          <ul className="absolute bg-white border rounded shadow-md mt-2 z-10 w-full">
                            {statusOptions.map((status) => (
                              <li key={status.value}>
                                <button
                                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${status.value === pengajuan.status_pengajuan
                                      ? 'font-bold'
                                      : ''
                                    }`}
                                  onClick={() =>
                                    handleStatusChange(
                                      pengajuan.id_pengajuan,
                                      status.value
                                    )
                                  }
                                >
                                  {status.value}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedRow === pengajuan.id_pengajuan && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-bold">ID Pengajuan:</p>
                            <p>{pengajuan.id_pengajuan}</p>
                          </div>
                          <div>
                            <p className="font-bold">Motivasi:</p>
                            <p>{pengajuan.motivasi}</p>
                          </div>
                          <div>
                            <p className="font-bold">Kondisi Rumah:</p>
                            <p>{pengajuan.kondisi_rumah}</p>
                          </div>
                          <div>
                            <p className="font-bold">Pengalaman Peliharaan:</p>
                            <p>{pengajuan.pengalaman_peliharaan}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Tidak ada data pengajuan {filterStatus !== 'Semua' && `untuk status ${filterStatus}`}.
        </div>
      )}
    </div>
  );
};

export default TabelPengajuan;
