import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoLocationSharp } from "react-icons/io5";
import location from "../assets/images/location.jpg";
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Location:React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1300, 
      once: true, 
    });
  }, []);

  return (
    <div className="location-part row p-3 mx-2 mb-2">
      <div
        className="col-12 col-md-6"
        data-aos="fade-up" 
      >
        <div className="content">
          <span id="title">OUR LOCATION</span>
          <h1 data-aos="fade-right">WHERE TO FIND US</h1> 
          <p data-aos="fade-up">
            The Patio Time Cafe is located on Silk Street, in the heart of
            London city, on the edge of Soho. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Donec quam felis, ultricies nec.
          </p>
          <p data-aos="fade-up" data-aos-delay="200">
            Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
            dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
            tellus. Aenean leo ligula, porttitor eu.
          </p>
          <div
            className="bottom"
            data-aos="fade-up"
            data-aos-delay="400" 
          >
            <div className="part">
              <IoLocationSharp className="icon" />
              <span> Silk St, Barbican, London EC2Y 8DS, UK</span>
            </div>
            <div className="part">
              <FaPhone className="icon" /> <span>+39-055-123456</span>
            </div>
            <div className="part">
              <HiOutlineMail className="icon" />{" "}
              <span>booking@patiotime.com</span>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/place/Barbican+Centre/@51.5205487,-0.0936463,18z/data=!4m15!1m8!3m7!1s0x48761ca98744377d:0x9e296ec2b218ce78!2zU2lsayBTdCwgQ2l0eSBvZiBMb25kb24sIExvbmRvbiwgQmlybMmZxZ9tacWfIEtyYWxsxLFx!3b1!8m2!3d51.5198784!4d-0.0916234!16s%2Fm%2F0114pv7l!3m5!1s0x48761b56fb64b275:0xc756e26675d21f40!8m2!3d51.5202077!4d-0.0937864!16zL20vMG02cTY?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="map-btn"
            data-aos="zoom-in" 
          >
            VIEW IN GOOGLE MAPS
          </a>
        </div>
      </div>
      <div
        className="col-12 col-md-6"
        data-aos="fade-left" 
      >
        <div className="img">
          <img src={location} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Location;
