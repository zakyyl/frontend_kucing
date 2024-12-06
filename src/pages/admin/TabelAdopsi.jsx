import React from 'react';
import { useLocation } from 'react-router-dom';

const TabelAdopsi = () => {
  const location = useLocation();
  const { adopsiData } = location.state || {};

  return (
    <div className="container mt-5">
      <h2>Data Adopsi</h2>
      {adopsiData && adopsiData.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID Adopsi</th>
              <th>Nama Kucing</th>
              <th>Nama Pengguna</th>
              <th>Tanggal Adopsi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {adopsiData.map((adopsi) => (
              <tr key={adopsi.id_adopsi}>
                <td>{adopsi.id_adopsi}</td>
                <td>{adopsi.nama_kucing}</td>
                <td>{adopsi.nama_pengguna}</td>
                <td>{new Date(adopsi.tanggal_adopsi).toLocaleDateString()}</td>
                <td>{adopsi.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default TabelAdopsi;
