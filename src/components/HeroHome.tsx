import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import bg1 from "../assets/images/homepage_bg.jpg";
import bg2 from "../assets/images/bghome2.jpg";
import bg3 from "../assets/images/bg3.jpg";
import bg4 from "../assets/images/bg4.jpg";

const Homepage: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const images = [bg1, bg2, bg3, bg4];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-container">
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
        data-aos="fade-in"
      >
        <div className="overlay" data-aos="fade-up">
          <h1 data-aos="fade-down">WELCOME TO HOMEPAGE</h1>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
