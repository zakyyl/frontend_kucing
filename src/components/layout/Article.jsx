import { SparklesIcon, BookOpenIcon, CalendarIcon } from '@heroicons/react/24/solid';

const articles = [
  {
    id: 1,
    title: '8 Things To Know Before Adopting a Cat',
    image: 'https://cdn2.thecatapi.com/images/8b8.jpg',
    description:
      'Pelajari berbagai hal yang perlu diketahui sebelum mengadopsi kucing, mulai dari perawatan hingga komitmen jangka panjang.',
    date: 'November 15, 2024',
    link: 'https://cats.com/what-to-know-when-adopting-a-cat',
  },
  {
    id: 2,
    title: '10 Tips for New Cat Owners',
    image: 'https://cdn2.thecatapi.com/images/a22.jpg',
    description:
      'Pelajari 10 tips penting untuk mempersiapkan rumah Anda bagi kucing baru, mulai dari perawatan hingga menciptakan ruang bermain.',
    date: 'Desember 1, 2024',
    link: 'https://www.petmd.com/cat/care/evr_ct_tips_for_new_cat_owners',
  },
  {
    id: 3,
    title: "Understanding Your Cat's Behavior",
    image: 'https://cdn2.thecatapi.com/images/a8h.jpg',
    description:
      'Kenali perilaku unik kucing Anda dan bagaimana membangun hubungan yang lebih baik melalui pemahaman dan perawatan yang tepat.',
    date: 'November 28, 2024',
    link: 'https://www.humanesociety.org/resources/understanding-cat-behavior',
  },
];

const Article = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-purple-100 py-20 px-6 relative overflow-hidden">
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

      <div className="container mx-auto relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-500 to-purple-600 mb-12 
          flex items-center justify-center gap-4">
          <BookOpenIcon className="w-12 h-12 text-pink-400 animate-pulse" />
          Articles
          <SparklesIcon className="w-12 h-12 text-purple-400 animate-pulse" />
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white/80 backdrop-blur-sm 
              rounded-2xl overflow-hidden shadow-xl 
              transform hover:scale-105 hover:rotate-3 
              transition-all duration-300 ease-in-out 
              border-2 border-transparent hover:border-pink-200"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover 
                  transition-transform duration-300 
                  group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 
                  bg-pink-500/80 text-white 
                  px-3 py-1 rounded-full 
                  flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-xs">{article.date}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-pink-500 to-purple-600 mb-3">
                  {article.title}
                </h2>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {article.description}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center 
                  px-6 py-2 overflow-hidden 
                  bg-gradient-to-r from-pink-500 to-purple-600 
                  text-white font-bold rounded-full 
                  shadow-md hover:shadow-xl 
                  transition duration-300 
                  transform hover:-translate-y-1"
                >
                  <span className="absolute left-0 w-full h-0 transition-all 
                    bg-pink-600 opacity-100 group-hover:h-full 
                    ease duration-400 origin-top"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    Read More
                    <SparklesIcon className="w- 6 h-6 animate-pulse" />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Article;