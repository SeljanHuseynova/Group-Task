import { Link } from "react-router";
import ContactRequest from "./ContactRequest";

const ContactSection = () => {
  return (
    <div className="contact-section row p-5">
      <div className="col-6 col-sm-6">
        <div className="contect">
          <span>GET IN TOUCH</span>
          <h1>CONTACT US</h1>
          <p>
            For general enquiries please email: <span>info@patiotime.com</span>
          </p>
          <p>
            Reserve by email: <span>booking@patiotime.com</span>
          </p>
          <div className="bottom">
            <h4>Opening hours:</h4>
            <p>Mon – Thu: 10.00 am – 01:00 am</p>
            <p>Fri – Sun: 10:00 am – 02:00 am</p>
          </div>
          <Link to="/reservation" className="link">Online Reservation</Link>
        </div>
      </div>
      <div className="col-6 col-sm-6">
        <ContactRequest />
      </div>
    </div>
  );
};

export default ContactSection;
