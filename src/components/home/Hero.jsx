import React from "react";
import petImage from "../../assets/images/pet.jpg";
import "../../styles/hero.css"; 

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Adopt <span>Love</span>, <span>foster</span> happiness.</h1>
        <p>With a focus on matching the right pet with the right family, PetFoster makes it easy to adopt love and foster happiness.</p>
        <button className="view-pets-btn">Find a Pet</button>
      </div>
      <div className="hero-image">
        <img src={petImage} alt="Happy Corgi" />
      </div>
    </section>
  );
};

export default Hero;