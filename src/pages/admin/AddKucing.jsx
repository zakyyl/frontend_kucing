import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AddKucing = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    nama: '',
    umur: '',
    ras: '',
    jk: '',
    kondisi: '',
    deskripsi: '',
    foto: null,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      foto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!token) {
      setError('Anda harus login terlebih dahulu');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nama', formData.nama);
    formDataToSend.append('umur', formData.umur);
    formDataToSend.append('ras', formData.ras);
    formDataToSend.append('jk', formData.jk);
    formDataToSend.append('kondisi', formData.kondisi);
    formDataToSend.append('deskripsi', formData.deskripsi);
    if (formData.foto) {
      formDataToSend.append('foto', formData.foto);
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/kucing',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response data:', response.data);
      Swal.fire({
        title: 'Sukses!',
        text: 'Data kucing berhasil ditambahkan',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      navigate('/admin/dashboard');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat menambahkan data kucing';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-6 bg-pink-100 rounded-lg shadow-md max-w-2xl">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Tambah Data Kucing ✨</h2>
      {error && (
        <div className="bg-red-200 text-red-800 p-3 mb-4 rounded-md">{error}</div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="nama" className="block text-lg font-medium text-purple-600 mb-2">
            Nama Kucing
          </label>
          <input
            type="text"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="umur" className="block text-lg font-medium text-purple-600 mb-2">
            Umur (tahun)
          </label>
          <input
            type="number"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            id="umur"
            name="umur"
            value={formData.umur}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ras" className="block text-lg font-medium text-purple-600 mb-2">
            Ras Kucing
          </label>
          <input
            type="text"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            id="ras"
            name="ras"
            value={formData.ras}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="jk" className="block text-lg font-medium text-purple-600 mb-2">
            Jenis Kelamin
          </label>
          <select
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            id="jk"
            name="jk"
            value={formData.jk}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Jantan">Jantan</option>
            <option value="Betina">Betina</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="kondisi" className="block text-lg font-medium text-purple-600 mb-2">
            Kondisi
          </label>
          <input
            type="text"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            id="kondisi"
            name="kondisi"
            value={formData.kondisi}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-lg font-medium text-purple-600 mb-2">
            Deskripsi
          </label>
          <textarea
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            id="deskripsi"
            name="deskripsi"
            rows="4"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="foto" className="block text-lg font-medium text-purple-600 mb-2">
            Foto
          </label>
          <input
            type="file"
            className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            id="foto"
            name="foto"
            onChange={handleFileChange}
            accept="image/*"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  );
};

export default AddKucing;
