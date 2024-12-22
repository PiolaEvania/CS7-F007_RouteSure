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
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Team from './Team';

const HomeView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [deskripsi, setDeskripsi] = useState('');
  const [userRole, setUserRole] = useState(null);
  const status = ['proses', 'berhasil'];
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);

  const handleButtonClick = () => {
    setShowButton(false);
  };

  const handleOutsideClick = () => {
    setShowButton(true);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
    AOS.init({
      duration: 1000,
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
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          const removeUser = localStorage.removeItem('user');
          Cookies.remove('jwt');
          axios.post('https://api-route-sure.vercel.app/api/logout', removeUser, { withCredentials: true })
            .then(() => {
              console.log('Log Out Berhasil');
              toast.success('Anda telah Log Out');
              navigate('/login');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
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

      axios.post('https://api-route-sure.vercel.app/api/laporan', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log('FormData:', [...formData.entries()]);
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          toast.error('Laporan dengan lokasi ini sudah ada dan sedang diproses');
        });
    }, (error) => {
      console.error(error);
      toast.error('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan');
    });
  };

  const navigation = [
    { name: 'Laporan', href: '#form', current: false },
    { name: 'Layanan', href: '#dashboard', current: false },
    { name: 'Tentang Kami', href: '#about', current: false },
  ]

  return (
    <div>
      {/* Navbar */}
      <Disclosure as="nav" className="fixed py-4 w-full bg-gray-800 z-20">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 ml-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-11 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-11 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img className='h-11 w-auto'
                  src="https://i.imgur.com/riEnqhq.png" 
                  alt="Logo RouteSure" 
                />
              </div>
              <div className="hidden sm:ml-6 sm:block md:m-auto lg:m-auto">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-md font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex bg-gray-800 text-sm rounded-md p-1 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    src="https://img.icons8.com/?size=50&id=YIZ59MTJsuUz&format=png&color=ffffff"
                    className=""
                    alt="Dashboard"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {userRole === '671b672b3981db347cfd7832' && (
                  <MenuItem>
                    <a
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-500 data-[focus]:text-white data-[focus]:outline-none">
                    Dashboard
                    </a>
                  </MenuItem>
                )}
                <MenuItem>
                  <button
                    className="block px-4 py-2 h-full w-full text-left text-sm text-gray-700 data-[focus]:bg-red-500 data-[focus]:text-white data-[focus]:outline-none"
                    onClick={handleLogoutButton}
                  >
                    Keluar
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>

    {/* Hero */}
    <div className='bg-gray-800 bg-opacity-90'>
      <Content />
    </div>

    {/* Main */}
    <div onClick={handleOutsideClick}>
      <div>
        <About />
      </div>
      
      {/* Maps */}
      <div
      className="relative flex flex-col my-4 justify-center items-center sm:flex-col md:justify-center md:items-center md:flex-col md:my-6 lg:flex-col xl:flex-row xl:mx-4 xl:justify-start xl:items-start">
        {showButton && (
            <button
              className="absolute h-[500px] bg-black bg-opacity-50 rounded-md text-white font-bold drop-shadow-lg text-xl flex justify-center items-center mb-4 z-10 top-[-1px] w-[350px] md:w-[700px] lg:w-[900px] xl:w-[800px] xl:mr-2"
              onClick={(e) => {
                e.stopPropagation(); // Mencegah event bubbling agar tidak memicu handleOutsideClick
                handleButtonClick();
              }}
            >
              Lihat Peta
            </button>
          )}

          <div className='absolute z-[10] top-[431px] ml-[-183px] md:top-[403px] md:ml-[-486px] lg:top-[403px] lg:ml-[-687px] xl:top-[403px] xl:ml-[0]'>
            <Weather />
          </div>

          <div className="relative h-[500px] mb-4 w-[350px] md:w-[700px] lg:w-[900px] lg:mb-6 xl:w-[800px] z-0">
            <Map />
          </div>

          {/* Form */}
          <section id='form' className="flex-1 xl:ml-4 bg-white">
            <div className="w-[350px] md:w-[700px] lg:w-[900px] xl:w-auto h-full">
              <div className=" p-6 border bg-lightCharcoal bg-opacity-90 border-white rounded-md shadow-md w-full">
                <h2 className="text-2xl text-white font-bold text-center leading-tight">Formulir Laporan</h2>
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
                        onClick={submitDataLaporan}><img src='https:img.icons8.com/?size=35&id=85971&format=png&color=FFFFFF' alt='Kirim' className='mr-2'/>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>

        <div>
          <DashboardCount />
        </div>

        <div>
          <Team />
        </div>
      </div>

      {/* Footer */}
      <div className='bottom-0'>
        <footer className='flex bg-gray-800 p-4'>
          <h1 className="flex-1 text-white text-xs md:text-lg text-center font-semibold">©2024 - RouteSure, All rights reserved</h1>
        </footer>
      </div>
      
    </div>
  );
};

export default HomeView;