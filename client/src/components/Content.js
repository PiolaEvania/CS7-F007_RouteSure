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
        <div className="relative min-h-max flex flex-col justify-between">
            {/* SVG sebagai bagian dari latar belakang */}
            <svg className="hidden absolute md:flex md:top-1/2 bottom-0 left-0 w-full h-auto z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className='h-10' fill="#2B3741" fill-opacity="0.5" d="M0,192L30,197.3C60,203,120,213,180,192C240,171,300,117,360,85.3C420,53,480,43,540,64C600,85,660,139,720,176C780,213,840,235,900,234.7C960,235,1020,213,1080,170.7C1140,128,1200,64,1260,48C1320,32,1380,64,1410,80L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
            {/* Konten utama */}
            <div className="h-full container md:h-1/2 mx-auto p-10 bg-darkCharcoal bg-opacity-50 z-10">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
                    {/* Bagian Deskripsi */}
                    <div className="w-full md:w-1/2">
                        <h1 data-aos="fade-right" className="text-4xl md:text-6xl text-black font-bold">
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
                        <p data-aos="fade-up" className="text-base md:text-lg mt-4 text-darkCharcoal">
                            Platform berbasis website yang dirancang untuk memudahkan masyarakat
                            dalam melaporkan masalah pada infrastruktur publik. Aplikasi ini
                            bertujuan untuk menjadi sarana yang cepat, efisien, dan dapat
                            diandalkan untuk meningkatkan respons dan perbaikan terhadap
                            kondisi infrastruktur yang bermasalah.
                        </p>
                    </div>
                    {/* Bagian Gambar */}
                    <div data-aos="fade-left" className="hidden w-full md:w-1/2 md:flex justify-center">
                        <img
                            className="w-3/4 md:w-full"
                            src="https://i.imgur.com/e00yiU7.png"
                            alt="Deskripsi Gambar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
