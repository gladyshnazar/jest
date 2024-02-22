import { selectModal } from "@/redux/modal/selectors";
import { useAppSelector } from "@/hooks/redux";
import useUser from "@/hooks/use-user";
import { CartItemType } from "@/redux/user/types";

import ModalProvider, {
  ModalClose,
} from "@/components/providers/ModalProvider";

import { handleCheckout } from "@/utils/checkout";
import useCart from "@/hooks/use-cart";
import SpinnerProvider from "../providers/SpinnerProvider";

export default function Cart() {
  const modal = useAppSelector(selectModal);
  const { data: user } = useUser();
  const { cartSummary } = useCart();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCheckout(user!.cart, true);
  };

  if (modal !== "cart") return null;
  return (
    <ModalProvider position='right'>
      <div className='modal-content-cart'>
        {!user || user.cart.length === 0 ? (
          <div className='empty-cart'>
            <div className='empty-cart-image'>
              <svg className='icon'>
                <use href='#svg-icon-cart-shopping'></use>
              </svg>
            </div>
            <h3>Your cart is empty</h3>
            <p>It looks like you haven't added anything to your cart yet.</p>
            <ModalClose className='red'>Keep buying</ModalClose>
          </div>
        ) : (
          <div className='cart'>
            <div className='cart-header'>
              <ModalClose className='cart-header-close'>
                <svg className='cart-header-close icon'>
                  <use href='#svg-icon-arrow-left'></use>
                </svg>
              </ModalClose>
              <h2 className='cart-header-title'>Your cart</h2>
              <div className='cart-header-icon'>
                <svg className='icon'>
                  <use href='#svg-icon-cart-shopping'></use>
                </svg>
              </div>
            </div>
            <div className='cart-products'>
              {user.cart.map(cartItem => (
                <CartItem key={cartItem.product._id} data={cartItem} />
              ))}
            </div>
            <div className='cart-subtotal'>
              <div className='cart-subtotal-price'>
                <h5 className='cart-subtotal-price-title'>Subtotal</h5>
                <div className='cart-subtotal-price-spacer'></div>
                <h5 className='cart-subtotal-price-value'>
                  ${cartSummary.totalPrice}
                </h5>
              </div>
              <p className='cart-subtotal-message'>
                Taxes included and shipping calculated at checkout.
              </p>
            </div>
            <div className='cart-checkout'>
              <button
                onClick={handleSubmit}
                type='submit'
                className='cart-checkout-button button-shadow red'
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </ModalProvider>
  );
}

const CartItem = ({ data }: { data: CartItemType }) => {
  const product = data.product;
  const {
    actions: {
      handleIncreaseProductQuantity,
      handleDecreaseProductQuantity,
      handleRemoveProductFromCart,
    },
    cartState,
  } = useCart();

  return (
    <SpinnerProvider isSpinning={cartState.isLoading} transparentBackground>
      <div className='cart-item'>
        <div className='cart-item-media'>
          <img src={product.imageUrls[0]} alt={product.name} />
        </div>
        <div className='cart-item-meta'>
          <div className='cart-item-meta-name'>{product.name}</div>
          <div className='cart-item-meta-footer'>
            <div className='cart-item-meta-footer-price'>${product.price}</div>
            <div className='cart-item-meta-footer-adjust-qty'>
              <button
                onClick={() => {
                  if (data.quantity !== 1) {
                    handleDecreaseProductQuantity(product._id);
                  }
                }}
                className='minus'
              >
                <svg className='icon'>
                  <use href='#svg-icon-minus'></use>
                </svg>
              </button>
              <span>{data.quantity}</span>
              <button
                onClick={() => handleIncreaseProductQuantity(product._id)}
                className='plus'
              >
                <svg className='icon'>
                  <use href='#svg-icon-plus'></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleRemoveProductFromCart(product._id)}
          className='cart-item-remove'
        >
          <svg className='icon'>
            <use href='#svg-icon-x'></use>
          </svg>
        </button>
      </div>
    </SpinnerProvider>
  );
};
