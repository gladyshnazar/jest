import links from "@/constants/links";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import useUser from "@/hooks/use-user";
import { OrderType } from "@/redux/user/types";
import InfoCard from "./InfoCard";

export default function Orders() {
  const { data: user } = useUser();

  /* TODO: Implement real orders */
  if (!user) return null;
  return (
    <div className='orders'>
      <Heading>Orders</Heading>
      <div className='orders-main'>
        {user.orders?.length === 0 ? (
          <div className='orders-no-data'>
            <div className='orders-no-data-icon'>
              <svg
                className='icon'
                width='100%'
                height='100%'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
                <line x1='3' y1='6' x2='21' y2='6'></line>
                <path d='M16 10a4 4 0 0 1-8 0'></path>
              </svg>
            </div>
            <p>You don't have any orders yet</p>
            <Link className='green @shadow' to={links.shop.all}>
              Start shopping
            </Link>
          </div>
        ) : (
          <div className='orders-data'>
            {user.orders.map(order => (
              <Order key={order._id} data={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Order({ data }: { data: OrderType }) {
  return (
    <div className='orders-order'>
      {/* Title */}
      <h2 className='orders-order-title truncate'>Order #{data._id}</h2>
      <div className='orders-order-main'>
        {/* Products with quantities */}
        <div className='orders-order-products'>
          {data.purchasedProducts.map(purchasedProduct => (
            <Link to={links.product(purchasedProduct.product.slug)}>
              <div className='orders-order-product'>
                <div className='orders-order-product-meta'>
                  <img src={purchasedProduct.product.imageUrls[0]} />
                </div>
                <div className='orders-order-product-info'>
                  <h5 className='orders-order-product-info-top'>
                    {purchasedProduct.product.name}
                  </h5>
                  <div className='orders-order-product-info-bottom'>
                    <span className='orders-order-product-info-bottom-price'>
                      ${purchasedProduct.product.price}
                    </span>
                    <span className='orders-order-product-info-bottom-quantity'>
                      x{purchasedProduct.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Information */}
        <div className='orders-order-info'>
          <InfoCard label='Ordered' value={data.createdAt} />
          <InfoCard label='Status' value='Success' />
        </div>
        {/* Total */}
        <div className='orders-order-total'> ${data.totalPrice}</div>
      </div>
    </div>
  );
}
