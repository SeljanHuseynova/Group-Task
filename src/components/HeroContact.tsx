import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroContact: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="bg-container-contact">
      <div className="bg-image-contact" data-aos="slide-down">
        <div className="overlay" data-aos="fade-up">
          <h1 data-aos="fade-down">CONTACT US</h1>
        </div>
      </div>
    </div>
  );
};

export default HeroContact;
