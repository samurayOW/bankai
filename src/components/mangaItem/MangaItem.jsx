import { FaStar } from "react-icons/fa6";
import { BASE_URL } from "../../strapi";
import "./mangaItem.css";

function MangaItem({ manga }) {
  return (
    <li className="bankai__manga-list-item">
      <img src={`${BASE_URL}/${manga.Cover.url}`} alt="cover" />
      <h4>{manga.Title}</h4>
      <p>
        {manga.production.Title} <FaStar /> 5{" "}
      </p>
      <span>{manga.Price}$</span>
    </li>
  );
}

export default MangaItem;
