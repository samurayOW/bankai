import { FaLongArrowAltRight } from "react-icons/fa";
import "./categories.css";

function Category({ title }) {
  return (
    <li className="bankai__categories-list_item">
      <img
        src="https://www.super-hobby.ru/zdjecia/9/4/3/52928_rd.jpg"
        alt="category"
      />
      <h4>{title}</h4>
    </li>
  );
}

function Categories() {
  return (
    <section className="bankai__section-categories">
      <div className="bankai__categories-inner">
        <div className="bankai__categories-heading">
          <h1>Categories</h1>
          <p>Find what you are looking for</p>
        </div>
        <div className="bankai__categories-center">
          <ul className="bankai__categories-list">
            <Category title="Mecha" />
            <Category title="Triller" />
            <Category title="Sport" />
          </ul>
          <p>Discover your next favorite story: browse our genres</p>
          <div className="bankai__categories-btn">
            <p>Explore</p> <FaLongArrowAltRight />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
