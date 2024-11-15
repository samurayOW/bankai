import "./about.css";
import { FaBook, FaBox } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";

function About() {
  return (
    <section className="bankai__section-about section__padding">
      <div className="bankai__about-inner">
        <div className="bankai__about-heading">
          <h1>About us</h1>
          <p>Order now and appreciate the magic of asian culture</p>
        </div>
        <ul className="bankai__about-list">
          <li className="bankai__about-list_item">
            <div>
              <FaBook />
            </div>
            <h3>Large Assortiment</h3>
            <p>Fresh new releases and hard-to-find titles always in stock</p>
          </li>
          <li className="bankai__about-list_item">
            <div>
              <FaBox />
            </div>
            <h3>Fast & Free Shipping</h3>
            <p>
              4-day or less delivery time, free shipping and an expedited
              delivery option
            </p>
          </li>
          <li className="bankai__about-list_item">
            <div>
              <MdAddCall />
            </div>
            <h3>24/7 Support</h3>
            <p>Answers to any business related inquiry 24/7 and in real-time</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default About;
