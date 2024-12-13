import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeartIcon } from '@heroicons/react/24/solid'; // Gunakan HeartIcon yang tersedia
import petImage from '../../assets/images/catowner.avif';

const Hero = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleFindPet = () => {
    if (isLoggedIn) {
      navigate('/kucinglist');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-pink-50 to-purple-100 
      min-h-screen flex items-center justify-center px-6 md:px-16 py-12 overflow-hidden">
      {/* Cute Background Decorations */}
      <div className="absolute top-0 left-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-pink-200 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm7 0c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-purple-200 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm7 0c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z" />
        </svg>
      </div>

      {/* Container untuk foto dan typography */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl">
        {/* Left Image with Cute Styling */}
        <div className="relative w-[370px] h-[450px] md:w-[400px] md:h-[500px] 
bg-white 
rounded-2xl 
shadow-2xl 
border-[24px] border-white 
border-b-[60px] 
transform transition-all duration-700 
hover:rotate-3 
flex flex-col items-center">
          {/* Kontainer Gambar */}
          <div className="w-full h-[80%] overflow-hidden">
            <img
              src={petImage}
              alt="Happy Pet"
              className="w-full h-full object-cover 
      transition-transform duration-500 
      hover:scale-110"
            />
          </div>

          {/* Caption Polaroid */}
          <div className="w-full h-[20%] flex items-center justify-center 
  bg-white border-t border-gray-200">
            <p className="text-center text-sm font-['Quicksand'] text-gray-700 
    tracking-wide italic">
              Pawfect Moment 📸
            </p>
          </div>

          {/* Detail Polaroid */}
          <div className="absolute bottom-[-20px] right-[-20px] 
  rotate-12 bg-lightPurple/20 px-4 py-1 rounded-lg">
            <span className="text-xs text-gray-600">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Shadow Effect */}
          <div className="absolute inset-0 
  pointer-events-none 
  shadow-[0_15px_30px_rgba(0,0,0,0.2)] 
  rounded-2xl"></div>
        </div>

        {/* Right Content with Playful Typography */}
        <div className="space-y-4 relative z-10 flex justify-center">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              <span>Adopt
                <span className="text-pink-500 ml-2">
                  <HeartIcon className="inline-block w-10 h-10 animate-pulse" />
                </span>
              </span>
              <span className="text-purple-600 block mt-2">Pawfect Happiness.</span>
            </h1>

            <p className="text-lg text-gray-600 font-medium bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md mt-4 ">
              Tempat sempurna untuk menemukan teman berbulu yang menggemaskan! 🐾
            </p>

            <button
              onClick={handleFindPet}
              className="group relative mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 gap-2"
            >
              🐾 Find a Pet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;