import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashboardCount = () => {
  const [userCount, setUserCount] = useState(0);
  const [laporanCount, setLaporanCount] = useState(0);
  const [laporanSelesaiCount, setLaporanSelesaiCount] = useState(0);
  const [laporanProsesCount, setLaporanProsesCount] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });

    const fetchData = () => {
      // Fetch total users
      axios
        .get('https://api-route-sure.vercel.app/api/get-user', { withCredentials: true })
        .then((response) => {
          if (Array.isArray(response.data.user)) {
            setUserCount(response.data.user.length);
          } else {
            console.error('Gagal mengambil data user:', response.data);
          }
        })
        .catch((err) => console.error(err));

      // Fetch total laporan
      axios
        .get('https://api-route-sure.vercel.app/api/laporan', { withCredentials: true })
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
            console.error('Gagal mengambil data laporan:', response.data);
          }
        })
        .catch((err) => console.error(err));
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-4" id='dashboard'>
      {/* Card for Total User */}
      <div
        className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #BBDEFB, #1565C0)',
        }}
      >
        <img
          src="https://img.icons8.com/?size=100&id=83190&format=png&color=1565C0"
          alt="User Icon"
          className="mx-auto mb-4 w-16 h-16"
        />
        <h3 className="text-xl font-semibold text-blue-800">Total User</h3>
        <p className="text-4xl font-bold text-blue-900">{userCount}</p>
      </div>

      {/* Card for Total Laporan */}
      <div
        className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #FEF3C7, #F59E0B)',
        }}
      >
        <img
          src="https://img.icons8.com/?size=100&id=83170&format=png&color=F59E0B"
          alt="Laporan Icon"
          className="mx-auto mb-4 w-16 h-16"
        />
        <h3 className="text-xl font-semibold text-yellow-800">Total Laporan</h3>
        <p className="text-4xl font-bold text-yellow-900">{laporanCount}</p>
      </div>

      {/* Card for Laporan dalam Proses */}
      <div
        className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #FFE8D6, #D97706)',
        }}
      >
        <img
          src="https://img.icons8.com/?size=100&id=111873&format=png&color=D97706"
          alt="Post Icon"
          className="mx-auto mb-4 w-16 h-16"
        />
        <h3 className="text-xl font-semibold text-orange-800">
          Laporan Diproses
        </h3>
        <p className="text-4xl font-bold text-orange-900">{laporanProsesCount}</p>
      </div>

      {/* Card for Laporan Selesai */}
      <div
        className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #E8F5E9, #4CAF50)',
        }}
      >
        <img
          src="https://img.icons8.com/?size=100&id=111878&format=png&color=4CAF50"
          alt="Comments Icon"
          className="mx-auto mb-4 w-16 h-16"
        />
        <h3 className="text-xl font-semibold text-green-800">Laporan Selesai</h3>
        <p className="text-4xl font-bold text-green-900">{laporanSelesaiCount}</p>
      </div>
    </div>
  );
};

export default DashboardCount;
