import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toastUtil = {
    position: 'top-left',
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
  };

  async function submitUserData(e) {
    e.preventDefault();
    if (!userData.email || !userData.name || !userData.password || !userData.confirmPassword) {
      toast.warn('Semua field harus diisi!', toastUtil);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      toast.warn('Format email harus example@gmail.com!', toastUtil);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      toast.warn('Password dan Confirm Password tidak sama!', toastUtil);
      return;
    }

    if (userData.password.length < 6) {
      toast.warn('Password minimal 6 karakter!', toastUtil);
      return;
    }

    try {
      const response = await axios.post('https://api-route-sure.vercel.app/api/register', userData);
      if (response.status === 200) {
        toast.success(`Akun ${ response.data.message } terdaftar`, toastUtil);
        navigate('/login');
      }
    }

    catch (err) {
      toast.error('Error: Email Anda sudah terdaftar', toastUtil);
      if (err) {
        console.error(err.response.data.message);
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-darkCharcoal px-6 py-12 lg:px-8">
      <div className="w-full max-w-lg bg-white rounded shadow-md p-6">
        <img className=' h-12 justify-center mx-auto'
          src="https://i.imgur.com/BxlYJgi.png"
          alt="Logo RouteSure"
        />
        <h1 className="text-center text-2xl font-bold text-gray-900">Daftar</h1>
        <p className="text-center text-sm text-gray-600">
          Buat akun untuk membuka semua fitur
        </p>
        <form method="POST" className="mt-6 space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <div className="relative mt-2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Masukkan email"
                required
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                onChange={(e) => setUserData((prevState) => ({ ...prevState, email: e.target.value }))}
              />
              <img
                src="https://img.icons8.com/?size=25&id=85500&format=png&color=0D0D0D"
                alt="Email Icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
          {/* Username Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Masukkan username"
                required
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                onChange={(e) => setUserData((prevState) => ({ ...prevState, name: e.target.value }))}
              />
              <img
                src="https://img.icons8.com/?size=25&id=83190&format=png&color=0D0D0D"
                alt="User Icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative mt-2">
              <input
                name="password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan password"
                required
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                onChange={(e) => setUserData((prevState) => ({ ...prevState, password: e.target.value }))}
              />
              <img
                src={showPassword
                  ? 'https://img.icons8.com/?size=25&id=121530&format=png&color=0D0D0D'
                  : 'https://img.icons8.com/?size=25&id=85130&format=png&color=0D0D0D'}
                alt="Toggle Password Visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ease-in-out"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>
          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
              Konfirmasi Password
            </label>
            <div className="relative mt-2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Masukkan konfirmasi password"
                required
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                onChange={(e) => setUserData((prevState) => ({ ...prevState, confirmPassword: e.target.value }))}
              />
              <img
                src={showConfirmPassword
                  ? 'https://img.icons8.com/?size=25&id=121530&format=png&color=0D0D0D'
                  : 'https://img.icons8.com/?size=25&id=85130&format=png&color=0D0D0D'}
                alt="Toggle Password Visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ease-in-out"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            </div>
          </div>
          {/* Login Redirect */}
          <p className="mt-2 text-center text-sm text-gray-500">
            Sudah memiliki akun?{' '}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Masuk
            </a>
          </p>
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 ease-in-out"
              onClick={submitUserData}
            >
              <img
                src="https://img.icons8.com/?size=25&id=85484&format=png&color=FFFFFF"
                className="mr-2"
                alt="Register"
              />
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
