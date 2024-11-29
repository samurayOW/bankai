import logo from "../../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdClose, IoMdPerson } from "react-icons/io";
import "./navbar.css";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavbarLinks() {
  return (
    <ul className="bankai__navbar-links">
      <NavLink to="/">
        <li className="bankai__navbar-links_link">Home</li>
      </NavLink>
      <NavLink to="manga">
        <li className="bankai__navbar-links_link">Buy manga</li>
      </NavLink>
      <li className="bankai__navbar-links_link">Contacts</li>
    </ul>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bankai__navbar">
      <div className="bankai__navbar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="bankai__navbar-inner">
        <div className="bankai__navbar-links--desktop">
          <NavbarLinks />
        </div>
        <div className="bankai__navbar-controls">
          <button className="bankai__navbar-controls_btn">
            <FaCartShopping />
          </button>
          <button className="bankai__navbar-controls_btn">
            <IoMdPerson />
          </button>
          <button
            className="bankai__navbar-controls_btn menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoMdClose /> : <HiMenuAlt3 />}
          </button>
          {isMenuOpen ? (
            <div className="bankai__navbar-links--mobile">
              <NavbarLinks />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
