import { FaLongArrowAltRight } from "react-icons/fa";
import "./newArrivals.css";
import NewArrivalsItem from "../newArrivalsItem/NewArrivalsItem";

function NewArrivals() {
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
          <NewArrivalsItem />
          <NewArrivalsItem />
          <NewArrivalsItem />
        </ul>
      </div>
    </section>
  );
}

export default NewArrivals;
