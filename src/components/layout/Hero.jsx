import React from "react";
import petImage from "../../assets/images/pet.jpg";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-10 py-20 bg-lightBlue">
      {/* Left Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-3/4 h-auto bg-lightPink rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src={petImage}
            alt="Happy Pet"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 text-center md:text-right">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Adopt <span className="text-lightPurple">Love</span>, <br />
          Pawfet <span className="text-lightPurple">Happiness</span>.
        </h1>
        <p className="mt-3 text-lg text-gray-700">
        Tempat sempurna untuk menemukan teman berbulu.
        </p>
        <button className="mt-8 px-8 py-3 bg-lightPink text-white text-lg font-medium rounded-full shadow-md hover:bg-pink-500 transition duration-300">
          Find a Pet
        </button>
      </div>
    </section>
  );
};

export default Hero;
