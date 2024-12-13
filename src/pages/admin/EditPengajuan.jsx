import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPengajuan = () => {
  const { id } = useParams();
  const [pengajuan, setPengajuan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPengajuan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/pengajuan/${id}`
        );
        setPengajuan(response.data.data);
      } catch (error) {
        console.error('Error fetching pengajuan data:', error);
      }
    };

    fetchPengajuan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPengajuan({
      ...pengajuan,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/pengajuan/${id}`,
        pengajuan
      );
      

      if (response.data.status === 'Adopsi Created') {
        alert('Pengajuan berhasil diperbarui, dan data adopsi telah dibuat.');
      } else {
        alert('Pengajuan berhasil diperbarui.');
      }

      const allPengajuan = await axios.get(
        'http://localhost:3001/api/v1/pengajuan'
      );
      const pengajuanData = allPengajuan.data.data;

      navigate('/tabel/pengajuan', { state: { pengajuanData } });
    } catch (error) {
      console.error('Error updating pengajuan:', error);
      alert('Terjadi kesalahan saat memperbarui pengajuan');
    }
  };

  if (pengajuan === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Pengajuan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="status_pengajuan" className="form-label">
            Status Pengajuan
          </label>
          <select
            id="status_pengajuan"
            name="status_pengajuan"
            className="form-control"
            value={pengajuan.status_pengajuan || ''}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="berhasil">berhasil</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="motivasi" className="form-label">
            Motivasi
          </label>
          <textarea
            id="motivasi"
            name="motivasi"
            className="form-control"
            value={pengajuan.motivasi || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="kondisi_rumah" className="form-label">
            Kondisi Rumah
          </label>
          <input
            type="text"
            id="kondisi_rumah"
            name="kondisi_rumah"
            className="form-control"
            value={pengajuan.kondisi_rumah || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pengalaman_peliharaan" className="form-label">
            Pengalaman Peliharaan
          </label>
          <input
            type="text"
            id="pengalaman_peliharaan"
            name="pengalaman_peliharaan"
            className="form-control"
            value={pengajuan.pengalaman_peliharaan || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default EditPengajuan;
