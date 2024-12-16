import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardCount = () => {
  const [userCount, setUserCount] = useState(0);
  const [laporanCount, setLaporanCount] = useState(0);
  const [laporanSelesaiCount, setLaporanSelesaiCount] = useState(0);
  const [laporanProsesCount, setLaporanProsesCount] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      // Fetch total users
      axios
        .get('http://localhost:5000/api/get-user', { withCredentials: true })
        .then((response) => {
          if (Array.isArray(response.data.user)) {
            setUserCount(response.data.user.length);
          } else {
            console.error('Failed to fetch user count:', response.data);
          }
        })
        .catch((err) => console.error(err));

      // Fetch total laporan
      axios
        .get('http://localhost:5000/api/laporan', { withCredentials: true })
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setLaporanCount(response.data.data.length);
            const prosesCount = response.data.data.filter(
              (laporan) => laporan.status === 'Proses'
            ).length;
            setLaporanProsesCount(prosesCount);
            const selesaiCount = response.data.data.filter(
              (laporan) => laporan.status === 'Selesai'
            ).length;
            setLaporanSelesaiCount(selesaiCount);
          } else {
            console.error('Failed to fetch laporan count:', response.data);
          }
        })
        .catch((err) => console.error(err));
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
      <div className="p-6 bg-blue-100 rounded-lg shadow">
        <img
          src="https://img.icons8.com/?size=100&id=83190&format=png&color=1565C0"
          alt="user icon"
          className="mx-auto mb-2"
        />
        <h3 className="text-lg font-semibold text-blue-800">Total User</h3>
        <p className="text-4xl font-bold text-blue-900">{userCount}</p>
      </div>
      <div className="p-6 bg-yellow-100 rounded-lg shadow">
        <img
          src="https://img.icons8.com/?size=100&id=83170&format=png&color=F59E0B"
          alt="laporan icon"
          className="mx-auto mb-2"
        />
        <h3 className="text-lg font-semibold text-yellow-800">Total Laporan</h3>
        <p className="text-4xl font-bold text-yellow-900">{laporanCount}</p>
      </div>
      <div className="p-6 bg-orange-100 rounded-lg shadow">
        <img
          src="https://img.icons8.com/?size=100&id=111873&format=png&color=D97706"
          alt="laporan proses icon"
          className="mx-auto mb-2"
        />
        <h3 className="text-lg font-semibold text-orange-800">Laporan dalam Proses</h3>
        <p className="text-4xl font-bold text-orange-900">{laporanProsesCount}</p>
      </div>
      <div className="p-6 bg-green-100 rounded-lg shadow">
        <img
          src="https://img.icons8.com/?size=100&id=111878&format=png&color=008000"
          alt="laporan selesai icon"
          className="mx-auto mb-2"
        />
        <h3 className="text-lg font-semibold text-green-800">Laporan Selesai</h3>
        <p className="text-4xl font-bold text-green-900">{laporanSelesaiCount}</p>
      </div>
    </div>
  );
};

export default DashboardCount;
