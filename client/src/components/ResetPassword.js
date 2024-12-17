import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function resetPasswordHandler(e) {
    e.preventDefault();
    const url = window.location.href;
    const token = url.split('/')[4];

    if (password !== confirmPassword) {
      toast.error('Password dan Confirm Password tidak sama!');
      return;
    }
    axios.put(`http://localhost:5000/api/resetPassword/${ token }`,
      { password: password })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        setPassword('');
        setConfirmPassword('');
      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  }


  return (
    <div>
      <div className="resetPassword bg-darkCharcoal min-h-screen">
        <div className="w-full flex justify-center items-center flex-col self-center min-h-screen">
          <div className="min-w-[300px] md:min-w-[400px] lg:min-w-[600px] border border-darkCharcoal h-[350px] bg-lightGray rounded shadow p-[20px]">
            <h1 className="text-center text-darkCharcoal pb-5 bg-inherit font-sans font-bold text-[1.25rem] md:text-[1.5rem] lg:text-[1.7rem]">Reset Password</h1>
            <form method='post'>
              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-darkCharcoal">Password</label>
                <div className="relative mt-2">
                  <input type="password" name="password" id="password" placeholder='Password' required className="block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6" onChange={(e) => setPassword(e.target.value)}/><img
                    src="https://img.icons8.com/?size=25&id=85161&format=png&color=2B3741"
                    alt="Password Icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mt-2 block text-sm/6 font-medium text-darkCharcoal">Confirm Password</label>
                <div className="relative mt-2">
                  <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' required className="block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6" onChange={(e) => setConfirmPassword(e.target.value)}/><img
                    src="https://img.icons8.com/?size=25&id=85161&format=png&color=2B3741"
                    alt="Password Icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                </div>
              </div>
              <div className="mt-2 justify-center text-center">
                <a href='/login' className="text-darkCharcoal hover:underline">Login to RouteSure</a>
              </div>
              <div className='pt-7'>
                <button type="submit" className="flex w-full justify-center rounded-md bg-greenA px-3 py-1.5 text-sm/6 font-bold text-lightGray shadow-sm hover:bg-darkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-darkGreen transition duration-150 ease-in-out" onClick={resetPasswordHandler}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
