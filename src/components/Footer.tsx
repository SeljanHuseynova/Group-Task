import { FaFacebookF, FaPhone, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { AiFillYoutube } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="footer container-fluid p-5">
      <footer>
        <div className="row g-3 top-footer">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="part">
              <h1>Patio.Time</h1>
              <p>
                Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                justo.
              </p>
              <div className="icons">
                <FaFacebookF className="icon" />
                <FaXTwitter className="icon" />
                <GrInstagram className="icon" />
                <FaPinterest className="icon" />
                <AiFillYoutube className="icon" />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="part">
              <h3>Working Hours</h3>
              <div className="times">
                <div className="time">
                  <p>Monday - Friday</p>
                  <span>09:00 - 22:00</span>
                </div>
                <div className="time">
                  <p>Saturday</p>
                  <span>11:00 - 00:00</span>
                </div>
                <div className="time">
                  <p>Sunday</p>
                  <span>11:00 - 23:00</span>
                </div>
                <div className="time-last">
                  <p>* Happy hour </p>
                  <span>17:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="part">
              <h3>Our Address</h3>
              <div className="contact">
                <IoLocationSharp className="icon" />
                <p>Silk St, Barbican, London EC2Y 8DS, UK</p>
              </div>
              <div className="contact">
                <FaPhone className="icon" />
                <p>+994997212005</p>
              </div>
              <div className="contact">
                <MdOutlineEmail />
                <p>selcanh05@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="part">
              <h3>Newsletter</h3>
              <p>Receive the latest news from us.</p>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <span>
            © Copyright PatioTime WordPress Theme for Restaurant & Cafe.
          </span>
          <div className="right">
            <p>PRIVACY</p>
            <p>TERM OF USE</p>
            <p>POLICY</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
5;
