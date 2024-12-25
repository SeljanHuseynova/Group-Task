import "../assets/style/homepage.css";
import bg1 from "../assets/images/homepage_bg.jpg";
import bg2 from "../assets/images/bghome2.jpg";
import bg3 from "../assets/images/bg3.jpg";
import bg4 from '../assets/images/bg4.jpg';
import { useEffect, useState } from "react";
const Homepage = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const images = [bg1, bg2, bg3,bg4];

  useEffect(() => {
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
      >
        <div className="overlay">
         
        </div>
      </div>
    </div>
  );
};

export default Homepage;
