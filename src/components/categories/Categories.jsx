import { FaLongArrowAltRight } from "react-icons/fa";
import "./categories.css";
import { BASE_URL } from "../../strapi";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Link } from "react-router-dom";

function Category({ title, cover, id }) {
  return (
    <li className="bankai__categories-list_item">
      <Link to={`/buy-manga/${id}`}>
        <img src={`${BASE_URL}${cover}`} alt="category" />
        <h4>{title}</h4>
      </Link>
    </li>
  );
}

function Categories() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchGenres() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/genres?populate=*`);
        if (!res.ok) {
          throw new Error(`API Error: ${res.statusText}`);
        }
        const data = await res.json();
        setGenres(data.data.slice(0, 3));
      } catch (err) {
        console.log("💥💥💥", err);
      } finally {
        setIsLoading(false);
      }
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
            {isLoading ? (
              <MoonLoader color="#000" speedMultiplier={0.25} />
            ) : (
              genres.map((genre) => (
                // <Link to={`/buy-manga/${genre.id}`}>
                <Category
                  title={genre.Title}
                  cover={genre.Cover.url}
                  key={genre.id}
                  id={genre.id}
                />
                // </Link>
              ))
            )}
          </ul>
          <p>Discover your next favorite story: browse our genres</p>
          <Link to="categories">
            <div className="bankai__categories-btn">
              <p>Explore</p> <FaLongArrowAltRight />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Categories;
