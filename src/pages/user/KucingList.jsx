import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCat, FaFilter, FaPaw } from 'react-icons/fa';

const KucingList = () => {
  const [kucings, setKucings] = useState([]);
  const [filterRas, setFilterRas] = useState('');
  const [filterJk, setFilterJk] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKucings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found. Please log in.');

        const response = await axios.get(
          'http://localhost:3001/api/v1/kucing/available',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setKucings(response.data.data || []);
      } catch (error) {
        console.error('Error fetching kucing data:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          setError('Your session has expired. Please log in again.');
        } else {
          setError('Failed to load pets. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchKucings();
  }, [navigate]);

  const filteredKucings = kucings.filter((kucing) => {
    const matchesRas = filterRas ? kucing.ras === filterRas : true;
    const matchesJk = filterJk ? kucing.jk === filterJk : true;
    const matchesSearch = kucing.nama.toLowerCase().includes(searchTerm.toLowerCase()); 
    return matchesRas && matchesJk && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-12 px-6 sm:px-12 relative">
      <div className="absolute top-0 left-0 opacity-20">
        <FaCat className="text-9xl text-purple-200" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-20">
        <FaCat className="text-9xl text-purple-200 transform rotate-180" />
      </div>

      <h1 className="text-4xl font-['Comfortaa'] font-bold text-center text-lightPurple mb-8 flex justify-center items-center gap-3">
        <FaPaw className="text-pink-400" />
        Find Your Cat 🐱
      </h1>

      
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="nama kucing..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-4 pr-4 py-2 border-2 border-pink-300 rounded-full bg-white/80 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
        />
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <div className="relative">
          <select
            value={filterRas}
            onChange={(e) => setFilterRas(e.target.value)}
            className="pl-10 pr-4 py-2 border-2 border-pink-300 rounded-full bg-white/80 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          >
            <option value="">Semua Ras</option>
            {[...new Set(kucings.map((kucing) => kucing.ras))].map((ras) => (
              <option key={ras} value={ras}>
                { ras}
              </option>
            ))}
          </select>
          <FaFilter className="absolute left-3 top-3 text-pink-400" />
        </div>

        <div className="relative">
          <select
            value={filterJk}
            onChange={(e) => setFilterJk(e.target.value)}
            className="pl-10 pr-4 py-2 border-2 border-pink-300 rounded-full bg-white/80 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          >
            <option value="">Semua Jk</option>
            <option value="Jantan">Jantan</option>
            <option value="Betina">Betina</option>
          </select>
          <FaFilter className="absolute left-3 top-3 text-pink-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center space-x-4">
          <FaCat className="text-4xl text-purple-500 animate-bounce" />
          <p className="text-xl text-gray-700">Mencari teman berbulu...</p>
        </div>
      ) : error ? (
        <p className="text-center text-xl text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredKucings.length === 0 ? (
            <div className="col-span-3 text-center">
              <FaCat className="text-6xl text-purple-300 mx-auto mb-4" />
              <p className="text-xl text-gray-700">
                Belum ada kucing yang tersedia dengan filter ini 😿
              </p>
            </div>
          ) : (
            filteredKucings.map((kucing) => (
              <Link
                to={`/kucingdetail/${kucing.id}`}
                key={kucing.id}
                className="block transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="bg-white/80 shadow-lg rounded-3xl overflow-hidden border-4 border-pink-200 hover:border-purple-300 transition-all group h-full flex flex-col">
                  <div className="relative w-full h-64 overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        kucing.foto
                          ? `http://localhost:3001/uploads/${kucing.foto}`
                          : 'path_to_default_image.jpg'
                      }
                      alt={kucing.nama}
                      className="w-full h-full object-contain" 
                      style={{
                        objectPosition: 'center',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                      <h3 className="text-2xl font-semibold text-white text-center">
                        {kucing.nama}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 bg-white/60 flex-grow">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <p className="text-sm text-gray-600 bg-pink-100 rounded-full py-1">
                        <strong>Ras:</strong> {kucing.ras}
                      </p>
                      <p className="text-sm text-gray-600 bg-purple-100 rounded-full py-1">
                        <strong>JK:</strong> {kucing.jk}
                      </p>
                      <p className="text-sm text-gray-600 bg-blue-100 rounded-full py-1">
                        <strong>Umur:</strong> {kucing.umur} thn
                      </p>
                      <p className="text-sm text-gray-600 bg-green-100 rounded-full py-1">
                        <strong>Kondisi:</strong> {kucing.kondisi}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default KucingList;