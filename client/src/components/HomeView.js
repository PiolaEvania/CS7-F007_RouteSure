import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Map from './mapComponent/Map';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DashboardCount from './DashboardCount';
import About from './About';
import Weather from './Weather';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Content from './Content';

const HomeView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deskripsi, setDeskripsi] = useState('');
  const [userRole, setUserRole] = useState(null);
  const status = ['proses', 'berhasil'];
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Apakah animasi hanya dijalankan sekali
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleLogoutButton = () => {
    const getUser = localStorage.getItem('user');
    if (getUser) {
      Swal.fire({
        title: 'Anda yakin?',
        text: 'Anda akan log out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Log Out',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const removeUser = localStorage.removeItem('user');
          Cookies.remove('jwt');
          axios.post('http://localhost:5000/api/logout', removeUser, { withCredentials: true })
            .then(() => {
              toast.success('Logout berhasil.');
              navigate('/login');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
  };

  const handleDashboardButton = () => {
    navigate('/dashboard');
  };

  const submitDataLaporan = (e) => {
    e.preventDefault();

    if (!name || !email || !image || !deskripsi) {
      toast.warn('Form laporan harus diisi!');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('status', status[0]);
      formData.append('latitude', position.coords.latitude);
      formData.append('longitude', position.coords.longitude);
      formData.append('deskripsi', deskripsi);
      formData.append('image', image);

      axios.post('http://localhost:5000/api/laporan', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log('FormData:', [...formData.entries()]);
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload()
          }, 5000)
        })
        .catch((error) => {
          console.error(error);
          toast.error('Laporan dengan lokasi ini sudah ada dan sedang diproses.');
        });
    }, (error) => {
      console.error(error);
      toast.error('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
    });
  };

  return (
    <div className="bg-white">
      <header className="flex flex-1 py-4 bg-darkCharcoal bg-opacity-50 justify-center items-center sticky top-0 z-50">
        {/* Dashboard Button for Admin */}
        {userRole === '671b672b3981db347cfd7832' && (
          <button
            onClick={handleDashboardButton}
            className="transition duration-150 ease-in-out"
          >
            <img
              src="https://img.icons8.com/?size=50&id=YIZ59MTJsuUz&format=png&color=ffffff"
              className="hover:bg-darkCharcoal hover:rounded-md ml-4"
              alt="Dashboard"
            />
          </button>
        )}

        {/* Weather Widget - Always Visible */}
        <div className="flex flex-1">
          <Weather />
        </div>

        {/* Title - Always Visible */}
        <div className="hidden flex-1 sm:flex">
          <img className='h-12'
            src="https://i.imgur.com/riEnqhq.png" 
            alt="Logo RouteSure" 
            />
        </div>

        {/* Navigation */}
        <nav className="hidden sm:flex justify-center items-center">
          <ul className="flex flex-row decoration-transparent text-white">
            <li className="px-4 text-center text-xl font-bold">
              <a 
                href="#form" 
                className="relative transition-all duration-300 hover:text-white hover:bg-darkCharcoal hover:rounded-md p-1"
              >
                Laporan
              </a>
            </li>

            <li className="px-4 text-center text-xl font-bold">
              <a href="#dashboard"
                className="relative transition-all duration-300 hover:text-white hover:bg-darkCharcoal hover:rounded-md p-1"
              >
                Layanan</a>
            </li>
            <li className="px-4 text-center text-xl font-bold">
              <a href="#about"
                className="relative transition-all duration-300 hover:text-white hover:bg-darkCharcoal hover:rounded-md p-1"
              >
                Tentang</a>
            </li>
          </ul>
          <button
            onClick={handleLogoutButton}
            type="submit"
            className="transition duration-150 ease-in-out"
          >
            <img
              src="https://img.icons8.com/?size=44&id=105512&format=png&color=FFFFFF"
              className="hover:bg-red-500 hover:rounded-md ml-2 mr-4"
              alt="Log Out"
            />
          </button>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden flex items-center mr-4"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <img
            src="https://img.icons8.com/?size=50&id=83195&format=png&color=FFFFFF"
            alt="Hamburger Menu"
            className="hover:bg-blueA hover:rounded-md"
          />
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="flex flex-col items-center bg-darkCharcoal bg-opacity-50 p-4 w-full sm:hidden">
          <ul className="flex flex-col decoration-transparent text-white">
            <li className="py-2 text-center text-xl font-bold">
              <a href="#form" onClick={() => setMobileMenuOpen(false)}
                className="relative transition-all duration-300 hover:text-white hover:underline underline-offset-4 hover:scale-105"
              >
                Laporan
              </a>
            </li>
            <li className="py-2 text-center text-xl font-bold">
              <a href="#dashboard" onClick={() => setMobileMenuOpen(false)}
                className="relative transition-all duration-300 hover:text-white hover:underline underline-offset-4 hover:scale-105"
              >
                Layanan
              </a>
            </li>
            <li className="py-2 text-center text-xl font-bold">
              <a href="#about" onClick={() => setMobileMenuOpen(false)}
                className="relative transition-all duration-300 hover:text-white hover:underline underline-offset-4 hover:scale-105"
              >
                Tentang
              </a>
            </li>
            <li className="py-2 text-center text-xl font-bold hover:bg-red-500 rounded-full">
              <button onClick={handleLogoutButton}>Keluar</button>
            </li>
          </ul>
        </nav>
      )}

      <div className="flex flex-1">
        <Content />
      </div>

      <div className='flex flex-col md:flex-row mt-2 sm:flex-col'>
        <div className="w-full md:w-[800px] h-[500px] border ml-3 mt-2 md:mr-3 mb-6 md:mb-0 z-0">
          <Map />
        </div>

        <section className="flex-1 bg-white">
          <div className="ml-2 mr-3 h-full flex items-center justify-center">
            <div className="p-6 border bg-lightCharcoal bg-opacity-90 border-white rounded-md shadow-md w-full">
              <h2 className="text-2xl text-white font-bold text-center leading-tight" id='form'>Formulir Laporan</h2>
              <form className="mt-5" encType="multipart/form-data">
                <div className="space-y-4">
                  <div>
                    <label className="text-base font-medium text-white">Nama Lengkap</label>
                    <div className="relative mt-2">
                      <input
                        placeholder="Masukkan nama lengkap"
                        type="text"
                        className="mt-2 flex h-10 w-full rounded-md border border-gray-500 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 text-darkCharcoal"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/><img
                        src="https://img.icons8.com/?size=25&id=86871&format=png&color=0D0D0D"
                        alt="NameTag Icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-white">Email</label>
                    <div className="relative mt-2">
                      <input
                        placeholder="Masukkan email"
                        type="email"
                        className="mt-2 flex h-10 w-full rounded-md border border-gray-500 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 text-darkCharcoal"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/><img src="https://img.icons8.com/?size=25&id=85500&format=png&color=0D0D0D" alt="Email Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-white">Deskripsi</label>
                    <div className="relative mt-2">
                      <input
                        placeholder="Masukkan deskripsi"
                        type="text"
                        className="mt-2 flex h-10 w-full rounded-md border border-gray-500 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 text-darkCharcoal"
                        name="deskripsi"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}/><img src="https://img.icons8.com/?size=25&id=83169&format=png&color=0D0D0D" alt="Email Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-white pb-2">Gambar</label>
                    <input
                      className="file:bg-white file:px-2 file:py-1 file:border-none file:rounded file:text-darkCharcoal file:cursor-pointer flex file-input w-full max-w-xs text-white hover:file:bg-slate-900 transition duration-150 ease-in-out hover:file:text-white"
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <button
                      className="inline-flex w-full items-center justify-center border-black border-2 rounded-md bg-darkCharcoal px-3.5 py-2.5 font-bold leading-7 text-white hover:bg-slate-900 transition duration-150 ease-in-out hover:text-white"
                      type="submit"
                      onClick={submitDataLaporan}><img src='https://img.icons8.com/?size=35&id=85971&format=png&color=FFFFFF' alt='Kirim' className='mr-2'/>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <section className="rounded-md p-2 bg-white" id='dashboard'>
        <DashboardCount />
      </section>
      <section className="rounded-md p-2 bg-white" id='about'>
        <About />
      </section>
      <footer className='flex bg-darkCharcoal p-6'>
        <h1 className="flex-1 text-white text-xl text-center font-bold">All rights reserved ©2024 - RouteSure</h1>
      </footer>
    </div>
  );
};

export default HomeView;