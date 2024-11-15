import "./feedbacks.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa6";

function Feedbacks() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
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
        <Slider {...settings}>
          <div className="slide">
            <p>
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>
            <div className="slider__customer">
              <div className="slider__customer-info">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3xBCw481nnz0XuFLFh3_RcaTNYsDwby_Yw&s"
                  alt=""
                />
                <div className="slider__customer-info_heading">
                  <h4>John Doe</h4>
                  <p>YouTube bloger</p>
                </div>
              </div>
              <div className="slider__customer-info_rating">
                <FaStar />
                <span>4.5</span>
              </div>
            </div>
          </div>
          <div className="slide">
            <p>
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>
            <div className="slider__customer">
              <div className="slider__customer-info">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3xBCw481nnz0XuFLFh3_RcaTNYsDwby_Yw&s"
                  alt=""
                />
                <div className="slider__customer-info_heading">
                  <h4>John Doe</h4>
                  <p>YouTube bloger</p>
                </div>
              </div>
              <div className="slider__customer-info_rating">
                <FaStar />
                <span>4.5</span>
              </div>
            </div>
          </div>
          <div className="slide">
            <p>
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>
            <div className="slider__customer">
              <div className="slider__customer-info">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3xBCw481nnz0XuFLFh3_RcaTNYsDwby_Yw&s"
                  alt=""
                />
                <div className="slider__customer-info_heading">
                  <h4>John Doe</h4>
                  <p>YouTube bloger</p>
                </div>
              </div>
              <div className="slider__customer-info_rating">
                <FaStar />
                <span>4.5</span>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default Feedbacks;
