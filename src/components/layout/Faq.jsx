import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { 
  SparklesIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/solid';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    question: 'Mengapa saya harus mengadopsi kucing?',
    answer:
      'Mengadopsi kucing adalah cara yang baik untuk memberikan mereka rumah penuh cinta dan mengurangi jumlah hewan terlantar. Selain itu, kucing bisa menjadi sahabat yang setia dan menggemaskan!',
  },
  {
    id: 2,
    question: 'Apa saja yang perlu saya siapkan sebelum mengadopsi?',
    answer:
      'Pastikan Anda memiliki mangkuk makanan, tempat tidur nyaman, mainan, kotak pasir, dan tentunya banyak kasih sayang untuk si kucing baru!',
  },
  {
    id: 3,
    question: 'Apakah kucing mudah beradaptasi dengan rumah baru?',
    answer:
      'Ya! Namun, berikan mereka waktu dan ruang untuk menyesuaikan diri. Jangan lupa, peluk kucingmu saat mereka sudah merasa nyaman!',
  },
  {
    id: 4,
    question: 'Berapa biaya adopsi kucing?',
    answer:
      'Biaya adopsi biasanya digunakan untuk vaksinasi, sterilisasi, dan perawatan awal. Jangan khawatir, cinta dari kucing akan jauh lebih berharga!',
  },
  {
    id: 5,
    question: 'Apakah kucing bisa diajarkan trik seperti anjing?',
    answer:
      'Tentu saja bisa! Kucing pintar dan bisa belajar trik seperti duduk, high-five, atau bahkan bermain fetch. Sabar dan beri mereka camilan sebagai motivasi!',
  },
  {
    id: 6,
    question: 'Bagaimana cara memilih kucing yang cocok untuk saya?',
    answer:
      'Pilihlah berdasarkan gaya hidup Anda. Jika Anda suka bermain, pilih kucing yang energik. Jika Anda suka ketenangan, pilih kucing yang lebih tenang.',
  },
  {
    id: 7,
    question: 'Apakah kucing harus selalu berada di dalam rumah?',
    answer:
      'Kucing bisa hidup sehat di dalam rumah selama Anda menyediakan banyak stimulasi seperti mainan dan tempat untuk memanjat.',
  },
  {
    id: 8,
    question: 'Apa yang harus saya lakukan jika kucing saya sakit?',
    answer:
      'Segera bawa kucing Anda ke dokter hewan untuk diagnosis dan perawatan. Jangan menunda jika mereka menunjukkan tanda-tanda sakit.',
  },
  {
    id: 9,
    question: 'Apakah kucing perlu divaksin?',
    answer:
      'Ya, vaksinasi penting untuk melindungi kucing dari penyakit serius seperti rabies dan panleukopenia.',
  },
  {
    id: 10,
    question: 'Bagaimana cara menjaga bulu kucing tetap sehat?',
    answer:
      'Sisir bulu kucing secara rutin untuk mengurangi bulu rontok dan mencegah kusut. Berikan makanan bergizi untuk kesehatan kulit dan bulu mereka.',
  },
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-gradient-to-br from-pink-50 to-purple-100 py-20 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 opacity-20 animate-float">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-pink-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-500 to-purple-600 mb-12 
          flex items-center justify-center gap-4">
          <QuestionMarkCircleIcon className="w-12 h-12 text-pink-400 animate-pulse" />
          Frequently Asked Questions 🐾
          <SparklesIcon className="w-12 h-12 text-purple-400 animate-pulse" />
        </h1>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/80 backdrop-blur-sm 
                rounded-2xl 
                border border-gray-100 
                shadow-md hover:shadow-xl 
                transition-all duration-300 
                overflow-hidden"
            >
              <div 
                className={`p-6 flex justify-between items-center cursor-pointer 
                  ${activeId === faq.id 
                    ? 'bg-gradient-to-r from-pink-50 to-purple-50' 
                    : 'hover:bg-gray-50'
                  } transition-colors`}
                onClick={() => toggleFAQ(faq.id)}
              >
                <h2 className={`text-xl font-semibold 
                  ${activeId === faq.id 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600' 
                    : 'text-gray-800'
                  }`}>
                  {faq.question}
                </h2>
                {activeId === faq.id ? (
                  <FaChevronUp className="text-purple-500 w-6 h-6" />
                ) : (
                  <FaChevronDown className="text-gray-500 w-6 h-6" />
                )}
              </div>
              {activeId === faq.id && (
                <div className="p-6 pt-0 text-gray-700 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tambahan Call to Action */}
        <div className="mt-12 text-center bg-white/60 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto shadow-md">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            Masih Punya Pertanyaan?
          </h3>
          <p className="text-gray-700 mb-6">
            Jangan ragu untuk menghubungi kami! Kami siap membantu Anda menemukan 
            teman berbulu yang sempurna.
          </p>
          <a 
            href="/contact" 
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 
            text-white font-medium rounded-full 
            shadow-md hover:shadow-xl 
            transition duration-300 
            transform hover:-translate-y-1"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;