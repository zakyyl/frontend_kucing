import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "Mengapa saya harus mengadopsi kucing?",
    answer:
      "Mengadopsi kucing adalah cara yang baik untuk memberikan mereka rumah penuh cinta dan mengurangi jumlah hewan terlantar. Selain itu, kucing bisa menjadi sahabat yang setia dan menggemaskan!",
  },
  {
    id: 2,
    question: "Apa saja yang perlu saya siapkan sebelum mengadopsi?",
    answer:
      "Pastikan Anda memiliki mangkuk makanan, tempat tidur nyaman, mainan, kotak pasir, dan tentunya banyak kasih sayang untuk si kucing baru!",
  },
  {
    id: 3,
    question: "Apakah kucing mudah beradaptasi dengan rumah baru?",
    answer:
      "Ya! Namun, berikan mereka waktu dan ruang untuk menyesuaikan diri. Jangan lupa, peluk kucingmu saat mereka sudah merasa nyaman!",
  },
  {
    id: 4,
    question: "Berapa biaya adopsi kucing?",
    answer:
      "Biaya adopsi biasanya digunakan untuk vaksinasi, sterilisasi, dan perawatan awal. Jangan khawatir, cinta dari kucing akan jauh lebih berharga!",
  },
  {
    id: 5,
    question: "Apakah kucing bisa diajarkan trik seperti anjing?",
    answer:
      "Tentu saja bisa! Kucing pintar dan bisa belajar trik seperti duduk, high-five, atau bahkan bermain fetch. Sabar dan beri mereka camilan sebagai motivasi!",
  },
  {
    id: 6,
    question: "Bagaimana cara memilih kucing yang cocok untuk saya?",
    answer:
      "Pilihlah berdasarkan gaya hidup Anda. Jika Anda suka bermain, pilih kucing yang energik. Jika Anda suka ketenangan, pilih kucing yang lebih tenang.",
  },
  {
    id: 7,
    question: "Apakah kucing harus selalu berada di dalam rumah?",
    answer:
      "Kucing bisa hidup sehat di dalam rumah selama Anda menyediakan banyak stimulasi seperti mainan dan tempat untuk memanjat.",
  },
  {
    id: 8,
    question: "Apa yang harus saya lakukan jika kucing saya sakit?",
    answer:
      "Segera bawa kucing Anda ke dokter hewan untuk diagnosis dan perawatan. Jangan menunda jika mereka menunjukkan tanda-tanda sakit.",
  },
  {
    id: 9,
    question: "Apakah kucing perlu divaksin?",
    answer:
      "Ya, vaksinasi penting untuk melindungi kucing dari penyakit serius seperti rabies dan panleukopenia.",
  },
  {
    id: 10,
    question: "Bagaimana cara menjaga bulu kucing tetap sehat?",
    answer:
      "Sisir bulu kucing secara rutin untuk mengurangi bulu rontok dan mencegah kusut. Berikan makanan bergizi untuk kesehatan kulit dan bulu mereka.",
  },
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-lightBlue py-16 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-lightPurple text-center mb-8">
          Frequently Asked Questions 🐾
        </h1>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {faq.question}
                </h2>
                {activeId === faq.id ? (
                  <FaChevronUp className="text-lightPink" />
                ) : (
                  <FaChevronDown className="text-lightPurple" />
                )}
              </div>
              {activeId === faq.id && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
