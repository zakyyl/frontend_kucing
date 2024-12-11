import React from 'react';
import { useLocation } from 'react-router-dom';

const TabelAdopsi = () => {
  const location = useLocation();
  const { adopsiData } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">Data Adopsi</h2>

      {adopsiData && adopsiData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">ID Adopsi</th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">Nama Kucing</th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">Nama Pengguna</th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">Tanggal Adopsi</th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {adopsiData.map((adopsi) => (
                <tr key={adopsi.id_adopsi} className="border-t border-gray-200 hover:bg-purple-50 transition duration-200">
                  <td className="px-6 py-4 text-sm text-gray-800">{adopsi.id_adopsi}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{adopsi.nama_kucing}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{adopsi.nama_pengguna}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(adopsi.tanggal_adopsi).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        adopsi.status === "Berhasil"
                          ? "bg-green-400"
                          : adopsi.status === "Pending"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    >
                      {adopsi.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">Tidak ada data tersedia</p>
      )}
    </div>
  );
};

export default TabelAdopsi;
