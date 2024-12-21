import "./feedbacks.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../strapi";
import { MoonLoader } from "react-spinners";

function FeedbacksItem({ feedback }) {
  return (
    <div className="slide">
      <p>{feedback.Text}</p>
      <div className="slider__customer">
        <div className="slider__customer-info">
          <img src={`${BASE_URL}${feedback.Photo.url}`} alt="avatar" />
          <div className="slider__customer-info_heading">
            <h4>{feedback.Name}</h4>
            <p>{feedback.CustomerStatus}</p>
          </div>
        </div>
        <div className="slider__customer-info_rating">
          <FaStar />
          <span>{feedback.Mark}</span>
        </div>
      </div>
    </div>
  );
}

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchFeedbacks() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/feedbacks?populate=*`);
        if (!res.ok) {
          throw new Error(`API Error: ${res.statusText}`);
        }
        const data = await res.json();
        data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFeedbacks(data.data);
      } catch (err) {
        console.log("💥💥💥", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeedbacks();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="bankai__section-feedbacks section__padding">
      <div className="bankai__feedbacks-inner">
        <div className="bankai__feedbacks-heading">
          <h1>
            What customers say about <br /> <span>BANKAI?</span>
          </h1>
        </div>
      </div>

      <div className="bankai__feedbacks-slider">
        {isLoading ? (
          <MoonLoader color="pink" speedMultiplier={0.25} />
        ) : (
          <Slider {...settings}>
            {feedbacks.map((feedback) => (
              <FeedbacksItem feedback={feedback} key={feedback.id} />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}

export default Feedbacks;
