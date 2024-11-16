import { FaLongArrowAltRight } from "react-icons/fa";
import "./categories.css";
import { BASE_URL } from "../../strapi";
import { useEffect, useState } from "react";

function Category({ title, cover }) {
  return (
    <li className="bankai__categories-list_item">
      <img src={`${BASE_URL}${cover}`} alt="category" />
      <h4>{title}</h4>
    </li>
  );
}

function Categories() {
  const [genres, setGenres] = useState([]);

  useEffect(function () {
    async function fetchGenres() {
      const res = await fetch(`${BASE_URL}/api/genres?populate=*`);
      const data = await res.json();
      setGenres(data.data.slice(0, 3));
    }
    fetchGenres();
  }, []);

  return (
    <section className="bankai__section-categories">
      <div className="bankai__categories-inner">
        <div className="bankai__categories-heading">
          <h1>Categories</h1>
          <p>Find what you are looking for</p>
        </div>
        <div className="bankai__categories-center">
          <ul className="bankai__categories-list">
            {genres.map((genre) => (
              <Category
                title={genre.Title}
                cover={genre.Cover.url}
                key={genre.id}
              />
            ))}
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
