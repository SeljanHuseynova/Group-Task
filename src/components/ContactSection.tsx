import { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactRequest from "./ContactRequest";

const ContactSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div
      className="contact-section row p-2 p-sm-5 py-5 m-1 my-5 d-flex align-items-center"
      data-aos="fade-up"
    >
      <div className="col-12 col-md-6" data-aos="fade-right">
        <div className="content">
          <h6>GET IN TOUCH</h6>
          <h1>CONTACT US</h1>
          <p>
            For general enquiries please email: <span>info@patiotime.com</span>
          </p>
          <p>
            Reserve by email: <span>booking@patiotime.com</span>
          </p>
          <p>Tel: +39 055 1234567</p>
          <div className="bottom">
            <h5>Opening hours:</h5>
            <p>Mon – Thu: 10.00 am – 01:00 am</p>
            <p>Fri – Sun: 10:00 am – 02:00 am</p>
          </div>
          <Link to="/reservation" className="link">
            ONLINE RESERVATION
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-6" data-aos="fade-left">
        <ContactRequest />
      </div>
    </div>
  );
};

export default ContactSection;
