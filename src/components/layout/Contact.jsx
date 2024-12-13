import {
  SparklesIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/solid';


const Contact = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-purple-100 py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 opacity-20 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-pink-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm7 0c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-20 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zm7 0c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z" />
        </svg>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-500 to-purple-600 mb-6 
          flex items-center justify-center gap-4">
          <ChatBubbleLeftRightIcon className="w-12 h-12 text-pink-400 animate-pulse" />
          Get in Touch! 🐾
          <SparklesIcon className="w-12 h-12 text-purple-400 animate-pulse" />
        </h1>

        <p className="text-gray-700 mb-8 
          bg-white/60 backdrop-blur-sm rounded-full 
          px-6 py-3 max-w-2xl mx-auto 
          shadow-md hover:shadow-lg transition-shadow duration-300">
          Kami selalu senang mendengar kabar dari Anda! Apakah Anda memiliki
          pertanyaan, saran, atau ingin berbagi cerita tentang adopsi kucing
          Anda? Hubungi kami melalui salah satu cara berikut.
        </p>
        
        <div className="bg-white/80 backdrop-blur-sm 
          rounded-2xl p-8 max-w-2xl mx-auto 
          shadow-xl hover:shadow-2xl 
          transform hover:scale-105 
          transition-all duration-300 ease-in-out">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-500 to-purple-600 mb-6 
            flex items-center justify-center gap-3">
            <SparklesIcon className="w-8 h-8 text-pink-400 animate-pulse" />
            Send us a Message
            <SparklesIcon className="w-8 h-8 text-purple-400 animate-pulse" />
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-left">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 
                  border-2 border-pink-200 rounded-full 
                  text-gray-700 
                  focus:ring-2 focus:ring-purple-500 
                  focus:outline-none 
                  transition duration-300 
                  hover:border-purple-300"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-left">
                Your Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 
                  border-2 border-pink-200 rounde d-full 
                  text-gray-700 
                  focus:ring-2 focus:ring-purple-500 
                  focus:outline-none 
                  transition duration-300 
                  hover:border-purple-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-left">
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 
                  border-2 border-pink-200 rounded-lg 
                  text-gray-700 
                  focus:ring-2 focus:ring-purple-500 
                  focus:outline-none 
                  transition duration-300 
                  hover:border-purple-300"
                placeholder="Write your message here"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 
                text-white font-medium rounded-full 
                shadow-md hover:shadow-xl 
                transition duration-300 
                transform hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;