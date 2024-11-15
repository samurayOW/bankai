import "./footer.css";
import logo from "../../assets/logo.png";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="bankai__footer-section section__padding">
      <div className="bankai__footer-inner">
        <div className="bankai__footer-info">
          <div className="bankai__footer-logo">
            <img src={logo} alt="logo" />
          </div>
          <p>We help you find your dream manga</p>
          <ul className="bankai__footer-social-media-links">
            <li className="bankai__footer-social-media-links_item">
              <FaFacebookF />
            </li>
            <li className="bankai__footer-social-media-links_item">
              <RiInstagramFill />
            </li>
            <li className="bankai__footer-social-media-links_item">
              <FaTwitter />
            </li>
          </ul>
        </div>
        <div className="bankai__footer-links_container">
          <ul className="bankai__footer-links">
            <li className="bankai__footer-links_item links-title">
              Information
            </li>
            <li className="bankai__footer-links_item">About</li>
            <li className="bankai__footer-links_item">Product</li>
            <li className="bankai__footer-links_item">Blog</li>
          </ul>
          <ul className="bankai__footer-links">
            <li className="bankai__footer-links_item links-title">Company</li>
            <li className="bankai__footer-links_item">Community</li>
            <li className="bankai__footer-links_item">Career</li>
            <li className="bankai__footer-links_item">Our story</li>
          </ul>
          <ul className="bankai__footer-links">
            <li className="bankai__footer-links_item links-title">Contact</li>
            <li className="bankai__footer-links_item">Getting Started</li>
            <li className="bankai__footer-links_item">Pricing</li>
            <li className="bankai__footer-links_item">Resources</li>
          </ul>
        </div>
      </div>
      <p>© {date} Bankai. All rights reserved. Made by Eduard Mykhailov</p>
    </footer>
  );
}

export default Footer;
