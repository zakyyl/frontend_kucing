import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TabelPengajuan = () => {
  const location = useLocation();
  const { pengajuanData: initialData } = location.state || {};
  const [pengajuanData, setPengajuanData] = useState(initialData || []);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const statusOptions = [
    { value: "Pending", color: "bg-yellow-300 text-yellow-800" },
    { value: "Berhasil", color: "bg-green-300 text-green-800" },
    { value: "Rejected", color: "bg-red-300 text-red-800" },
  ];

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (newStatus === "Berhasil") {
        const confirmAdopsi = window.confirm(
          "Apakah Anda yakin ingin mengubah status menjadi Berhasil?"
        );
        if (!confirmAdopsi) {
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
      alert("Status pengajuan berhasil diperbarui");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Terjadi kesalahan saat memperbarui status");
    }
  };
  

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Data Pengajuan</h2>
      {pengajuanData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-pink-200 text-pink-800 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID Pengajuan</th>
                <th className="py-3 px-6 text-left">Nama Kucing</th>
                <th className="py-3 px-6 text-left">Nama Pengguna</th>
                <th className="py-3 px-6 text-left">Tanggal Pengajuan</th>
                <th className="py-3 px-6 text-left">Motivasi</th>
                <th className="py-3 px-6 text-left">Kondisi Rumah</th>
                <th className="py-3 px-6 text-left">Pengalaman Peliharaan</th>
                <th className="py-3 px-6 text-center">Status Pengajuan</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {pengajuanData.map((pengajuan, index) => (
                <tr
                  key={pengajuan.id_pengajuan}
                  className={`${
                    index % 2 === 0
                      ? "bg-purple-50"
                      : "bg-blue-50"
                  } border-b border-gray-200 hover:bg-blue-100`}
                >
                  <td className="py-3 px-6">{pengajuan.id_pengajuan}</td>
                  <td className="py-3 px-6">{pengajuan.Kucing?.nama || "N/A"}</td>
                  <td className="py-3 px-6">{pengajuan.Pengguna?.nama || "N/A"}</td>
                  <td className="py-3 px-6">
                    {new Date(pengajuan.tanggal_pengajuan).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">{pengajuan.motivasi}</td>
                  <td className="py-3 px-6">{pengajuan.kondisi_rumah}</td>
                  <td className="py-3 px-6">{pengajuan.pengalaman_peliharaan}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === pengajuan.id_pengajuan
                              ? null
                              : pengajuan.id_pengajuan
                          )
                        }
                        className={`py-1 px-3 rounded-full ${
                          statusOptions.find(
                            (status) =>
                              status.value === pengajuan.status_pengajuan
                          )?.color || "bg-gray-300 text-gray-800"
                        }`}
                      >
                        {pengajuan.status_pengajuan}
                      </button>
                      {activeDropdown === pengajuan.id_pengajuan && (
                        <ul className="absolute bg-white border rounded shadow-md mt-2 z-10 w-full">
                          {statusOptions.map((status) => (
                            <li key={status.value}>
                              <button
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                  status.value === pengajuan.status_pengajuan
                                    ? "font-bold"
                                    : ""
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
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Tidak ada data pengajuan.
        </div>
      )}
    </div>
  );
  
};

export default TabelPengajuan;
