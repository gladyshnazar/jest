import "@splidejs/react-splide/css";
import { Splide as Slider, SplideSlide as Slide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import links from "@/constants/links";

export default function Hero() {
  const SplideOptions = {
    type: "loop",
    drag: true,
    arrows: false,
    pagination: true,
    autoplay: true,
    speed: 300,
  };

  return (
    <section className='hero-section'>
      <div className='hero-slider'>
        <Slider options={SplideOptions}>
          <Slide>
            <div className='hero-slider-slide slide-1'>
              <div className='container'>
                <div className='hero-slider-slide-inner'>
                  <h3>Buy quality medical supplies at factory prices</h3>
                  <p>
                    Find more than 1,000 products for businesses and
                    professionals, with immediate availability and fair prices.
                    Guarantee a high standard in your professional practice. 🎉
                  </p>
                  <div className='hero-slider-slide-inner-buttons'>
                    <Link className='red @shadow' to={links.shop.all}>
                      Shop now
                    </Link>
                    <Link
                      className='pink @shadow'
                      to={links.mail("recipient@example.com")}
                    >
                      Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <Slide>
            <div className='hero-slider-slide slide-2'></div>
          </Slide>
        </Slider>
      </div>
    </section>
  );
}
