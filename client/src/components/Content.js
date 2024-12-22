import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';

const Content = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="flex h-auto w-screen justify-center items-center relative">
      <div className="mt-[80px] z-[5] absolute p-10 md:p-20 text-left w-full">
        <h1 className="text-2xl md:text-6xl lg:text-6xl text-white font-bold drop-shadow-xl">
          <Typewriter
            options={{
              strings: ['RouteSure'],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              delay: 100,
            }}
          />
        </h1>
        <p className="text-base md:text-xl lg:text-2xl mt-2 md:mt-4 lg:mt-8 text-white mb-2 md:mb-4 lg:mb-6">
          Platform berbasis website yang dirancang untuk memudahkan masyarakat dalam melaporkan masalah pada infrastruktur publik.
        </p>
        <button
          className="inline-block w-[150px] text-sm font-bold mt-2 rounded-md px-2 py-2 md:w-[200px] md:text-base md:mt-4 md:py-2 md:px-4 lg:w-[300px] lg:px-6 lg:py-4 lg:text-xl  bg-sky-700 hover:bg-white hover:text-sky-700 focus:text-white focus:bg-sky-700 text-gray-50 shadow-lg leading-loose transition duration-200"
        ><a href='#form'>Lapor Sekarang</a>
        </button>
      </div>
      <img src='https://images2.imgbox.com/1f/e8/W9um8NWQ_o.jpg' className='relative mt-[90px] flex justify-center items-center w-full h-auto brightness-50'/>
    </div>
  );
};

export default Content;