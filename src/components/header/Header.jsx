import { FaSearch } from "react-icons/fa";
import "./header.css";
import headerImg from "../../assets/header.png";

function Header() {
  return (
    <header className="bankai__header section__padding">
      <div className="bankai__header-inner">
        <div className="bankai__header-heading">
          <p>online manga store</p>
          <h1>BANKAI</h1>
          <div className="bankai__header-info">
            <div className="bankai__header-info-item">
              <span>200+</span>
              <p>unique titles</p>
            </div>
            <div className="bankai__header-info-line"></div>
            <div className="bankai__header-info-item">
              <span>5k+</span>
              <p>satisfied customers</p>
            </div>
          </div>
          <div className="bankai__header-input">
            <input
              type="text"
              placeholder="Search something. Example: BANKAI!"
            />
            <button>
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="bankai__header-image">
          <img src={headerImg} alt="header" />
        </div>
      </div>
    </header>
  );
}

export default Header;
