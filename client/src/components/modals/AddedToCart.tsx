import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import ModalProvider from "../providers/ModalProvider";
import { selectModal } from "@/redux/modal/selectors";
import useUser from "@/hooks/use-user";
import { setModal } from "@/redux/modal/reducer";
import { ProductType } from "@/redux/shop/types";
import useCart from "@/hooks/use-cart";

export default function AddedToCart({ data }: { data: ProductType }) {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);
  const { data: user } = useUser();
  const { cartSummary } = useCart();

  const handleContinue = () => {
    dispatch(setModal(null));
  };

  const handleGoToCart = () => {
    dispatch(setModal("cart"));
  };

  if (modal !== "added-to-cart") return null;
  return (
    <ModalProvider position='center'>
      <div className='modal-content-added-to-cart'>
        <div className='modal-content-added-to-cart-inner'>
          <div className='added-product'>
            <div className='added-product-media'>
              <img src={data?.imageUrls[0]} alt={data?.name} />
            </div>
            <div className='added-product-meta'>
              <div className='added-product-meta-success'>
                <div className='added-product-meta-success-icon'>
                  <svg className='icon'>
                    <use href='#svg-icon-check'></use>
                  </svg>
                </div>
                <h5 className='added-product-meta-success-message'>
                  Added to cart
                </h5>
              </div>
              <div className='added-product-meta-name'>{data?.name}</div>
            </div>
          </div>
          <div className='added-summary'>
            <div className='added-summary-cart-summary mobile-hidden'>
              <div className='added-summary-cart-summary-products'>
                {cartSummary.totalProducts} products
              </div>
              <div className='added-summary-cart-summary-price'>
                ${cartSummary.totalPrice}
              </div>
            </div>
            <div className='added-summary-buttons'>
              <button
                onClick={handleContinue}
                className='added-summary-buttons-continue button-shadow red'
              >
                Continue
              </button>
              <button
                onClick={handleGoToCart}
                className='added-summary-buttons-go-to-cart'
              >
                <svg className='icon'>
                  <use href='#svg-icon-cart-shopping'></use>
                </svg>
                Go to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
