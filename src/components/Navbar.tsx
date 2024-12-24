import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import "../assets/style/.navbar.css";
import logo from "../assets/images/pt-logo.svg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header>
      <div className="top-nav">
        <div className="right">
          <IoLocationSharp />
          <span>Silk St, Barbican, London EC2Y 8DS, UK</span>
        </div>
        <div className="left">
          <div className="phone">
            <FaPhone /> <span>+994997212005</span>
          </div>
          <div className="mail">
            <MdOutlineMailOutline />
            <span>selcanh05@gmail.com</span>
          </div>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg bottom-nav"
        aria-label="Offcanvas navbar large"
      >
        <div className="container-fluid">
          <img src={logo} alt="pt-logo" className="logo" />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar2"
            aria-controls="offcanvasNavbar2"
          >
            <HiOutlineMenuAlt3 />
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex={-1}
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header">
              <img src={logo} alt="pt-logo" className="logo" />

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-sm-2 gap-lg-4">
                <li className="nav-item">
                  <Link to="/" className="link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="link">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/meals" className="link">
                    Meals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reservation" className="link">
                    Reservation
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="link">
                    Contact
                  </Link>
                </li>
                <li>
                  <button className="book-btn">
                    <Link to="/reservation" className="link">
                      Book A Table
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
