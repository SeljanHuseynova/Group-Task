import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import bg1 from "../assets/images/homepage_bg.jpg";
import bg2 from "../assets/images/bghome2.jpg";
import bg3 from "../assets/images/bg3.jpg";
import bg4 from "../assets/images/bg4.jpg";
import { Link } from "react-router";

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
          <div className="content">
            <h5>WELCOME TO PATIOTIME</h5>
            <h1>Delicious Food & Wonderful Eating Experience</h1>
            <p>We Serve Food, Harmony, & Laughter Since 1998</p>
            <Link to="/meals" id="menus-btn">
              VIEW FULL MENUS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
