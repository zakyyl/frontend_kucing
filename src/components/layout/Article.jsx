import React from "react";

const articles = [
    {
        id: 1,
        title: "8 Things To Know Before Adopting a Cat",
        image: "https://cdn2.thecatapi.com/images/8b8.jpg", 
        description:
          "Pelajari berbagai hal yang perlu diketahui sebelum mengadopsi kucing, mulai dari perawatan hingga komitmen jangka panjang.",
        date: "November 15, 2024",
        link: "https://cats.com/what-to-know-when-adopting-a-cat"

      },
  {
    id: 2,
    title: "10 Tips for New Cat Owners",
    image: "https://cdn2.thecatapi.com/images/a22.jpg",
    description:
      "Pelajari 10 tips penting untuk mempersiapkan rumah Anda bagi kucing baru, mulai dari perawatan hingga menciptakan ruang bermain.",
    date: "Desember 1, 2024",
    link: "https://www.petmd.com/cat/care/evr_ct_tips_for_new_cat_owners",
  },
  {
    id: 3,
    title: "Understanding Your Cat's Behavior",
    image: "https://cdn2.thecatapi.com/images/a8h.jpg",
    description:
      "Kenali perilaku unik kucing Anda dan bagaimana membangun hubungan yang lebih baik melalui pemahaman dan perawatan yang tepat.",
    date: "November 28, 2024",
    link: "https://www.humanesociety.org/resources/understanding-cat-behavior",
  },
];

const Article = () => {
  return (
    <section className="bg-cream py-16 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-lightPurple mb-8 text-center">
          Articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-lightPink text-white font-medium rounded-md shadow-md hover:bg-pink-500 transition duration-300"
                >
                  Read More
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
