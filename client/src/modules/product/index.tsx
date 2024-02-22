import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import "@splidejs/react-splide/css";
import { Splide } from "node_modules/@splidejs/react-splide/dist/types";
import {
  Splide as Slider,
  SplideSlide as Slide,
  SplideTrack as Track,
} from "@splidejs/react-splide";

import useUser from "@/hooks/use-user";
import DiscountedProducts from "@/modules/product/components/DiscountedProducts";

import PageHeader from "@/components/PageHeader";
import SpinnerProvider from "@/components/providers/SpinnerProvider";
import AddedToCart from "@/components/modals/AddedToCart";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useProduct from "./hooks/use-product";
import { calculateSavings } from "./utils/calculate-savings";
import { useAppDispatch } from "@/hooks/redux";
import { setModal } from "@/redux/modal/reducer";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { handleCheckout } from "@/utils/checkout";
import { ProductType } from "@/redux/shop/types";
import useCart from "@/hooks/use-cart";

export default function Product() {
  const dispatch = useAppDispatch();
  const { data: user } = useUser();

  /* Fetching  */
  const { slug } = useParams();
  const {
    data,
    isLoading: isFetching,
    error: fetchingError,
  } = useProduct(slug!);

  /* Actions */
  const {
    actions: { handleAddToCart: handleAsyncAddToCart },
    cartState,
    cartSummary,
  } = useCart();

  const handleAddToCart = () => {
    if (user) {
      handleAsyncAddToCart(data!._id);
    } else {
      dispatch(setModal("authentication"));
    }
  };

  const handleBuyNow = async (product: ProductType) => {
    if (user) {
      const checkoutProductData = {
        product: {
          _id: product!._id,
          name: product!.name,
          imageUrls: product!.imageUrls,
          price: product!.price,
        },
        quantity: 1,
      };
      await handleCheckout([checkoutProductData], false);
    } else {
      dispatch(setModal("authentication"));
    }
  };

  /* Splide config and functionality */
  const [currentThumbnail, setCurrentThumbnail] = useState<number>(0);
  const DesktopSplideRef = useRef<Splide>();

  const handleThumbs = (id: number) => {
    if (DesktopSplideRef.current) {
      DesktopSplideRef.current.go(id);
    }
  };

  const MobileSplideOptions = {
    type: "slide",
    drag: true,
    arrows: false,
    perPage: 1,
    perMove: 1,
  };

  const DesktopSplideOptions = {
    type: "slide",
    drag: false,
    arrows: false,
    pagination: false,
    perPage: 1,
  };

  useEffect(() => {
    handleThumbs(currentThumbnail);
  }, [currentThumbnail]);

  /* Free shipping message */
  let remainingForFreeShipping = 200;
  if (user) {
    remainingForFreeShipping = Math.max(200 - cartSummary.totalPrice, 0);
  }

  const freeShippingMessage =
    remainingForFreeShipping === 0
      ? "Shipping is free"
      : `You're only $${remainingForFreeShipping} away from getting free shipping`;

  return (
    <Fragment>
      <SkeletonTheme baseColor='#d8d8d8' highlightColor='#777777'>
        <PageHeader page='Product' />
        <div className='product-main'>
          <div className='container'>
            <div className='product-inner'>
              <div className='product-media'>
                <div className='mobile-slider desktop-hidden'>
                  <Slider hasTrack={false} options={MobileSplideOptions}>
                    <Track>
                      {data?.imageUrls.map((src, i) => (
                        <Slide key={src}>
                          <ImageWithSkeleton
                            condition={!isFetching}
                            skeletonHeight='300px'
                            src={src}
                            alt={`Product image ${i + 1}`}
                          />
                        </Slide>
                      ))}
                    </Track>
                  </Slider>
                </div>
                <div className='desktop-slider mobile-hidden'>
                  <div className='desktop-slider-thumbnails'>
                    {data?.imageUrls.map((src, i) => (
                      <div
                        className={`desktop-slider-thumbnail ${
                          currentThumbnail === i ? "active" : ""
                        }`}
                        key={src}
                        onClick={() => setCurrentThumbnail(i)}
                      >
                        <ImageWithSkeleton
                          condition={!isFetching}
                          src={src}
                          alt={`Product image ${i + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <Slider
                    ref={DesktopSplideRef}
                    hasTrack={false}
                    options={DesktopSplideOptions}
                  >
                    <Track>
                      {data?.imageUrls.map((src, i) => (
                        <Slide key={src}>
                          <ImageWithSkeleton
                            condition={!isFetching}
                            skeletonHeight='300px'
                            src={src}
                            alt={`Product image ${i + 1}`}
                          />
                        </Slide>
                      ))}
                    </Track>
                  </Slider>
                </div>
              </div>
              <div className='product-meta'>
                {isFetching ? (
                  <Skeleton count={1} width={300} height={20} />
                ) : (
                  <h1 className='product-title'>{data?.name}</h1>
                )}
                <div className='product-price'>
                  {isFetching ? (
                    <Skeleton count={1} width={150} height={30} />
                  ) : (
                    <div className='product-price-main'>
                      <div
                        className={`regular ${
                          data?.originalPrice ? "discounted" : ""
                        }`}
                      >
                        ${data?.price}
                      </div>
                      {data?.originalPrice && (
                        <div className='original'>${data.originalPrice}</div>
                      )}
                    </div>
                  )}

                  {data?.originalPrice && (
                    <div className='product-price-save'>
                      You Save
                      <span>
                        {
                          calculateSavings(data?.originalPrice, data.price)
                            .dollars
                        }{" "}
                        (
                        {
                          calculateSavings(data.originalPrice, data.price)
                            .percentage
                        }
                        )
                      </span>
                    </div>
                  )}
                  {isFetching ? (
                    <Skeleton
                      count={1}
                      width={300}
                      style={{ marginTop: "20px" }}
                    />
                  ) : (
                    <p className='product-price-note'>
                      Taxes included and shipping calculated at checkout
                    </p>
                  )}
                </div>
                <div className='product-buttons'>
                  <SpinnerProvider
                    isSpinning={cartState.isLoading}
                    transparentBackground
                  >
                    <button
                      onClick={handleAddToCart}
                      className='pink @shadow'
                      disabled={cartState.isLoading || isFetching}
                    >
                      Add to cart
                    </button>
                  </SpinnerProvider>
                  <button
                    onClick={() => handleBuyNow(data!)}
                    className='red'
                    disabled={isFetching}
                  >
                    Buy now
                  </button>
                </div>
                <div className='product-free-shipping'>
                  <div className='product-free-shipping-text'>
                    {freeShippingMessage}
                  </div>
                  {
                    <div className='product-free-shipping-statusbar'>
                      <div
                        className='current'
                        style={{
                          width: user
                            ? `${Math.min(
                                (cartSummary.totalPrice / 200) * 100,
                                100
                              )}%`
                            : "0%",
                        }}
                      ></div>
                    </div>
                  }
                </div>
                <div className='product-features'>
                  <div className='product-feature'>
                    <div className='product-feature-media'>
                      <img src='/svgs/delivery.svg' alt='Delivery icon' />
                    </div>
                    <div className='product-feature-meta'>
                      <h5>Shipping nationwide</h5>
                      <span>
                        Without additional costs from $190,000 in Bogotá.
                      </span>
                    </div>
                  </div>
                  <div className='product-feature'>
                    <div className='product-feature-media'>
                      <img src='/svgs/shield.svg' alt='Shield icon' />
                    </div>
                    <div className='product-feature-meta'>
                      <h5>Secure payment</h5>
                      <span>You can pay safely and however you want.</span>
                    </div>
                  </div>
                </div>
                <div className='product-description'>
                  Elevate your health with our premium supplements, meticulously
                  crafted for your well-being. Experience vitality like never
                  before with our natural ingredients, designed to support your
                  journey to a healthier lifestyle.
                  <ul>
                    <li>Boost vitality with our natural supplements.</li>
                    <li>Enhance wellness with our curated formulas.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {data && <DiscountedProducts currentProductId={data._id} />}

        <AddedToCart data={data!} />
      </SkeletonTheme>
    </Fragment>
  );
}
