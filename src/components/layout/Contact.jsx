import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-lightPink py-16 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-lightPurple mb-6">
          Get in Touch! 🐾
        </h1>
        <p className="text-gray-700 mb-8">
          Kami selalu senang mendengar kabar dari Anda! Apakah Anda memiliki pertanyaan, saran, atau ingin berbagi cerita tentang adopsi kucing Anda? Hubungi kami melalui salah satu cara berikut.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <FaEnvelope className="text-lightPurple text-4xl mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Email
            </h2>
            <p className="text-gray-600">contact@pawfectshelter.com</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <FaPhone className="text-lightPurple text-4xl mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Phone
            </h2>
            <p className="text-gray-600">+62 812-3456-7890</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <FaInstagram className="text-lightPurple text-4xl mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Instagram
            </h2>
            <p className="text-gray-600">@pawfectshelter</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-8 mt-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Send us a Message</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-lightPurple focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-lightPurple focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-lightPurple focus:outline-none"
                placeholder="Write your message here"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-lightPurple text-white font-medium rounded-md shadow-md hover:bg-purple-500 transition duration-300"
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
