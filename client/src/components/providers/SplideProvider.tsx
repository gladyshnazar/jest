import "@splidejs/react-splide/css";
import {
  Splide as Slider,
  SplideSlide as Slide,
  SplideTrack as Track,
} from "@splidejs/react-splide";
import React from "react";

type SplideProviderType = {
  children: React.ReactNode;
  hasArrows?: boolean;
};
export default function SplideTrackProvider({
  children,
  hasArrows = false,
}: SplideProviderType) {
  const SplideOptions = {
    type: "slide",
    drag: true,
    arrows: hasArrows,
    speed: 300,
    perPage: 2,
    perMove: 1,
    gap: "20px",
    mediaQuery: "min",
    breakpoints: {
      992: {
        perPage: 6,
      },
    },
  };

  const slides = React.Children.map(children, (child, index) => (
    <Slide key={index}>{child}</Slide>
  ));

  return (
    <Slider hasTrack={false} options={SplideOptions}>
      <Track>{slides}</Track>

      {/* Custom arrows  */}
      <div className='splide__arrows custom'>
        <button className='splide__arrow--prev'>
          <svg className='icon'>
            <use href='#svg-icon-arrow-right'></use>
          </svg>
        </button>
        <button className='splide__arrow--next'>
          <svg className='icon'>
            <use href='#svg-icon-arrow-right'></use>
          </svg>
        </button>
      </div>
    </Slider>
  );
}
