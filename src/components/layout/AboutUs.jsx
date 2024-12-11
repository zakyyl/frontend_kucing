import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-lightBlue py-16 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-lightPurple mb-6">
          About Us
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8">
          Welcome to Pawfect Shelter! We are dedicated to providing a loving and safe environment for abandoned and stray animals. 
          Our mission is to connect these wonderful creatures with their forever homes, bringing joy and companionship to both pets and families.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-lightPurple mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To rescue, rehabilitate, and rehome animals in need while advocating for responsible pet ownership.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-lightPurple mb-4">Our Vision</h2>
            <p className="text-gray-600">
              A world where every animal has a loving home and is treated with compassion and respect.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-lightPurple mb-4">Our Values</h2>
            <p className="text-gray-600">
              Compassion, integrity, and community are at the heart of everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
