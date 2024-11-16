import "./newArrivalsItem.css";
import { BASE_URL } from "../../strapi";

function NewArrivalsItem({ title, cover, price }) {
  const truncatedTitle = title.length > 19 ? `${title.slice(0, 16)}...` : title;

  return (
    <li className="bankai__new-arrivals_item">
      <img src={`${BASE_URL}${cover}`} alt="cover" />
      <p>{truncatedTitle}</p>
      <span>{price}$</span>
    </li>
  );
}

export default NewArrivalsItem;
