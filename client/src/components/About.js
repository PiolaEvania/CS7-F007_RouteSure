import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  return (
    <div className="container mx-auto p-6">
      <div className='text-center'>
        <h1 className='text-2xl lg:text-3xl font-bold mb-6' id='about'>Tentang Kami</h1>
        <p className='text-lg lg:text-xl'>RouteSure adalah sebuah website pelaporan infrastruktur publik yang dirancang untuk memudahkan masyarakat dalam melaporkan permasalahan terkait fasilitas dan infrastruktur umum, seperti jalan rusak atau kerusakan fasilitas umum lainnya. Platform ini bertujuan untuk menjembatani komunikasi antara masyarakat dan pihak berwenang dalam menjaga kualitas infrastruktur.</p><br/>
        <p className='text-lg lg:text-xl'>RouteSure memungkinkan pengguna untuk mengirim laporan secara cepat dan praktis. Setiap laporan yang diterima akan mencakup detail lokasi yang diambil dari lokasi device, deskripsi masalah, serta bukti pendukung seperti foto, sehingga mempermudah pihak terkait dalam mengidentifikasi dan menangani masalah yang dilaporkan.</p>
      </div>
    </div>
  );
};

export default About;
