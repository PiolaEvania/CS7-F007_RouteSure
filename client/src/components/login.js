import axios from 'axios';
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const toastUtil = {
    position: 'top-left',
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
  };

  async function submitUserData(e) {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      toast.error('Semua field harus diisi!', toastUtil);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/login', userData, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.status === 200) {
        toast.success(`Akun ${ response.data.message } terdaftar.`, toastUtil);
        setUser(response.data.user);
      }
      if (response.data.user.name === 'admin') {
        console.log('Navigating to /dashboard');
        navigate('/dashboard');
      } else {
        console.log('Navigating to /home');
        navigate('/home');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error('Error: Email atau Password salah!', toastUtil);
        return;
      } else {
        toast.error('Terjadi kesalahan pada server.', toastUtil);
        return;
      }
    }
  }

  return (
    <div>
      <div className='login bg-darkCharcoal min-h-screen'>
        <div className='flex flex-col w-full justify-center items-center self-center min-h-screen'>
          <div className='min-w-[300px] md:min-w-[400px] lg:min-w-[600px] border border-lightGray h-[350px] bg-inherit rounded shadow p-[20px]'>
            <h1 className='text-center text-lightGray font-bold font-sans text-[1.25rem] md:text-[1.5rem] lg:text-[1.7rem] pb-5'>Login</h1>
            <form method='post'>
              <div>
                <label htmlFor='email' className='block text-sm/6 font-medium text-lightGray'>Email Address</label>
                <div className="relative mt-2">
                  <input type='email' name='email' id='email' required placeholder='Email Address' className='block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6' onChange={(e) => setUserData((prevState) => ({ ...prevState, email: e.target.value }))}/><img src="https://img.icons8.com/?size=25&id=85500&format=png&color=2B3741" alt="Email Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                </div>
              </div>
              <div>
                <label htmlFor='password' className='mt-2 block text-sm/6 font-medium text-lightGray'>Password</label>
                <div className="relative mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="Password"
                    className="block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6"
                    onChange={(e) =>
                      setUserData((prevState) => ({ ...prevState, password: e.target.value }))
                    }/><img
                    src="https://img.icons8.com/?size=25&id=85161&format=png&color=2B3741"
                    alt="Password Icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                </div>
              </div>
              <div className='justify-end text-right mt-2'>
                <a href='/forgotPassword' className='text-lightGray hover:underline'>Forgot password?</a>
              </div>
              <div className='pt-2'>
                <button type='submit' className='flex w-full justify-center rounded-md bg-greenA px-3 py-1.5 text-sm/6 font-bold text-lightGray shadow-sm hover:bg-darkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-darkGreen transition duration-150 ease-in-out' onClick={submitUserData}><img src='https://img.icons8.com/?size=25&id=83887&format=png&color=D9D9D9' className='mr-2'/>Login</button>
              </div>
              <div className='justify-center text-center mt-2'>
                <a href='/register' className='text-lightGray hover:underline'>Don't have an account? Register</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;