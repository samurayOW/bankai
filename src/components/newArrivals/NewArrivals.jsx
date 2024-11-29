import { FaLongArrowAltRight } from "react-icons/fa";
import "./newArrivals.css";
import NewArrivalsItem from "../newArrivalsItem/NewArrivalsItem";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../strapi";
import { MoonLoader } from "react-spinners";

function NewArrivals() {
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchMangas() {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/api/mangas?populate=*`);
      const data = await res.json();
      data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMangas(data.data.slice(0, 3));
      setIsLoading(false);
    }
    fetchMangas();
  }, []);

  return (
    <section className="bankai__section-new-arrivals section__padding">
      <div className="bankai__new-arrivals-inner">
        <div className="bankai__new-arrivals-heading">
          <h1>New Arrivals</h1>
          <p>
            Discover new manga every week, <br /> exclusively at our store
          </p>
          <div className="bankai__new-arrivals-heading_btn">
            <p>See More</p> <FaLongArrowAltRight />
          </div>
        </div>
        <ul className="bankai__new-arrivals-list">
          {isLoading ? (
            <MoonLoader color="pink" speedMultiplier={0.25} />
          ) : (
            mangas.map((manga) => (
              <NewArrivalsItem
                title={manga.Title}
                cover={manga.Cover.url}
                price={manga.Price}
                key={manga.id}
              />
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

export default NewArrivals;
