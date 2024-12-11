import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../../styles/kucinglist.css";

const KucingList = () => {
  const [kucings, setKucings] = useState([]);
  const [filterRas, setFilterRas] = useState('');
  const [filterJk, setFilterJk] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKucings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found. Please log in.');
        
        const response = await axios.get('http://localhost:3001/api/v1/kucing/available', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
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
    return matchesRas && matchesJk;
  });

  return (
    <div className="min-h-screen bg-lightBlue py-12 px-6 sm:px-12">
      <h1 className="text-4xl font-semibold text-center text-lightPurple mb-8">Find Your Perfect Pet 🐾</h1>
      
      <div className="flex justify-center space-x-4 mb-8">
        <select
          value={filterRas}
          onChange={(e) => setFilterRas(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white text-gray-700"
        >
          <option value="">Semua Ras</option>
          {[...new Set(kucings.map(kucing => kucing.ras))].map(ras => (
            <option key={ras} value={ras}>{ras}</option>
          ))}
        </select>

        <select
          value={filterJk}
          onChange={(e) => setFilterJk(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white text-gray-700"
        >
          <option value="">Semua Jk</option>
          <option value="Jantan">Jantan</option>
          <option value="Betina">Betina</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-xl text-gray-700">Loading...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredKucings.length === 0 ? (
            <p className="text-center text-xl text-gray-700 col-span-3">No pets available matching your filters.</p>
          ) : (
            filteredKucings.map((kucing) => (
              <Link to={`/kucingdetail/${kucing.id}`} key={kucing.id} className="block transform transition-all hover:scale-105">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl border-4 border-lightPurple">
                  <img
                    src={kucing.foto ? `http://localhost:3001/uploads/${kucing.foto}` : 'path_to_default_image.jpg'}
                    alt={kucing.nama}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-2xl font-semibold text-lightPurple text-center">{kucing.nama}</h3>
                    <p className="text-sm text-gray-600 mt-2 text-center"><strong>Ras:</strong> {kucing.ras}</p>
                    <p className="text-sm text-gray-600 text-center"><strong>Jenis Kelamin:</strong> {kucing.jk}</p>
                    <p className="text-sm text-gray-600 text-center"><strong>Umur:</strong> {kucing.umur} tahun</p>
                    <p className="text-sm text-gray-600 text-center"><strong>Kondisi:</strong> {kucing.kondisi}</p>
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
