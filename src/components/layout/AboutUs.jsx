import { HeartIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/solid';

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-purple-100 py-20 px-6 relative overflow-hidden">
      {/* Cute Background Decorations */}
      <div className="absolute top-0 left-0 opacity-20 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-pink-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm7 0c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z"/>
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-20 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm7 0c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z"/>
        </svg>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-500 to-purple-600 mb-6 
          flex items-center justify-center gap-4">
          <SparklesIcon className="w-12 h-12 text-pink-400 animate-pulse" />
          About Us
          <SparklesIcon className="w-12 h-12 text-purple-400 animate-pulse" />
        </h1>
        
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8 
          bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 
          shadow-md hover:shadow-lg transition-shadow duration-300">
          Welcome to <span className="font-bold text-pink-600">Pawfect Shelter</span>! We are dedicated to providing a loving and
          safe environment for abandoned and stray animals. Our mission is to
          connect these wonderful creatures with their forever homes, bringing
          joy and companionship to both pets and families.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Our Mission",
              description: "To rescue, rehabilitate, and rehome animals in need while advocating for responsible pet ownership.",
              icon: <HeartIcon className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-bounce" />
            },
            {
              title: "Our Vision",
              description: "A world where every animal has a loving home and is treated with compassion and respect.",
              icon: <StarIcon className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-bounce" />
            },
            {
              title: "Our Values",
              description: "Compassion, integrity, and community are at the heart of everything we do.",
              icon: <SparklesIcon className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-bounce" />
            }
          ].map((section, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 text-center 
              transform hover:scale-105 hover:rotate-3 
              transition-all duration-300 ease-in-out 
              border-2 border-transparent hover:border-pink-200"
            >
              {section.icon}
              <h2 className="text-2xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;