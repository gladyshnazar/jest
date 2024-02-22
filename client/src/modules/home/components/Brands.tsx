import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

export default function Brands() {
  const SplideOptions = {
    type: "loop",
    gap: "20px",
    drag: false,
    arrows: false,
    pagination: false,
    perPage: 2,
    autoScroll: {
      pauseOnHover: false,
      pauseOnFocus: false,
      rewind: false,
      speed: 1,
    },
  };

  return (
    <section className='brands-section'>
      <div className='container'>
        <div className='brands-inner'>
          <p>Suppliers and allies</p>
          <Splide options={SplideOptions} extensions={{ AutoScroll }}>
            <SplideSlide>
              <div className='brands-slide-conteiner'>
                <img src='/images/brands/brand.png' alt='Image 1' />
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className='brands-slide-conteiner'>
                <img src='/images/brands/brand2.png' alt='Image 2' />
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className='brands-slide-conteiner'>
                <img src='/images/brands/brand3.png' alt='Image 3' />
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className='brands-slide-conteiner'>
                <img src='/images/brands/brand4.png' alt='Image 4' />
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className='brands-slide-conteiner'>
                <img src='/images/brands/brand5.png' alt='Image 5' />
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </section>
  );
}
