import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [emailUser, setEmail] = useState('');

  function checkEmail(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/api/forgotPassword', {
      email: emailUser
    }).then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      setEmail('');
    }).catch((err) => {
      toast.error('Email Anda tidak terdaftar!', err);
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-darkCharcoal px-6 py-12 lg:px-8">
      <div className="w-full max-w-md bg-white rounded shadow-md p-6">
        <img className=' h-12 justify-center mx-auto'
          src="https://i.imgur.com/BxlYJgi.png" 
          alt="Logo RouteSure" 
        /> 
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Lupa Password
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Masukkan email Anda untuk menerima intruksi reset password
        </p>
        <form method="POST" className="mt-6 space-y-6">
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
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              <img
                src="https://img.icons8.com/?size=25&id=85500&format=png&color=0D0D0D"
                alt="Email Icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 ease-in-out"
              onClick={checkEmail}
            >
              Kirim Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
