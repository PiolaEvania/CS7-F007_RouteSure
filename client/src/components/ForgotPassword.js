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
    <div>
      <div className="forgotPassword bg-darkCharcoal min-h-screen">
        <div className="w-full flex justify-center items-center flex-col self-center min-h-screen">
          <div className="min-w-[300px] md:min-w-[400px] lg:min-w-[600px] border border-darkCharcoal h-[250px] bg-lightGray rounded shadow p-[20px]">
            <h1 className="text-center text-darkCharcoal pb-5 bg-inherit font-sans font-bold text-[1.25rem] md:text-[1.5rem] lg:text-[1.7rem]">Forgot Password</h1>
            <form method='post'>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-darkCharcoal">Email Address</label>
                <div className="relative mt-2">
                  <input type="email" name="email" id="email" placeholder='Email Address' required className="block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6'" onChange={(e) => setEmail(e.target.value)}/><img src="https://img.icons8.com/?size=25&id=85500&format=png&color=2B3741" alt="Email Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                </div>
              </div>
              <div className='pt-8'>
                <button type="submit" className="flex w-full justify-center rounded-md bg-greenA px-3 py-1.5 text-sm/6 font-bold text-lightGray shadow-sm hover:bg-darkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-darkGreen transition duration-150 ease-in-out" onClick={checkEmail}>Kirim</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;


