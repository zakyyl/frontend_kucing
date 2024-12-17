import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosinstance';

const TabelAdopsi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.auth);
  const [adopsiData, setAdopsiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }
    console.log('Received Location State:', location.state);

    
    if (!location.state?.adopsiData) {
      fetchAdopsiData();
    } else {
      
      setAdopsiData(location.state.adopsiData);
      setLoading(false);
    }
  }, [token, role, location.state]);

  const fetchAdopsiData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosInstance.get('/api/v1/adopsi', config);
      
      console.log('Fetched Adopsi Data:', response.data.data);
      
      setAdopsiData(response.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching adopsi data:', err);
      setError('Gagal memuat data adopsi');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
        <button 
          onClick={fetchAdopsiData} 
          className="mt-4 bg-pink-500 text-white px-4 py-2 rounded"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-pink-500 mb-6">
        Data Adopsi
      </h2>

      {adopsiData && adopsiData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="table-auto w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">
                  ID Adopsi
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">
                  Nama Kucing
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">
                  Nama Pengguna
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">
                  Tanggal Adopsi
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-purple-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {adopsiData.map((adopsi) => (
                <tr
                  key={adopsi.id_adopsi}
                  className="border-t border-gray-200 hover:bg-purple-50 transition duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {adopsi.id_adopsi}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {adopsi.nama_kucing}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {adopsi.nama_pengguna}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(adopsi.tanggal_adopsi).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        adopsi.status === 'Berhasil'
                          ? 'bg-green-400'
                          : adopsi.status === 'Pending'
                            ? 'bg-yellow-400'
                            : 'bg-red-400'
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
        <p className="text-center text-gray-600 mt-6">
          Tidak ada data tersedia
        </p>
      )}
    </div>
  );
};

export default TabelAdopsi;