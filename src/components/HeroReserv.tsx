import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroReserv: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="bg-image-reserv">
      <div className="overlay" data-aos="fade-in">
        <h1 data-aos="zoom-in">ONLINE RESERVATION</h1>
      </div>
    </div>
  );
};

export default HeroReserv;
