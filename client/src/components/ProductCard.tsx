import { Link } from "react-router-dom";

import { ProductType } from "@/redux/shop/types";
import links from "@/constants/links";
import ImageWithSkeleton from "./ImageWithSkeleton";

type ProductTypeProps = {
  data: ProductType;
};
export default function ProductCard({ data }: ProductTypeProps) {
  return (
    <div className='product-card hover'>
      <Link to={links.product(data.slug)}>
        <div className='product-card-budges'>
          {data.isDiscounted && (
            <div className='product-card-budge discounted'>SALE</div>
          )}
        </div>
        <div
          className='product-card-media'
          style={{
            backgroundImage: `url(${
              data.imageUrls[1] ? data.imageUrls[1] : data.imageUrls[0]
            })`,
          }}
        >
          <ImageWithSkeleton
            src={data.imageUrls[0]}
            alt={`${data.name} Product`}
          />
        </div>
        <div className='product-card-caption'>
          <div className='product-card-caption-price'>
            <div className='regular'>${data.price}</div>
            {data.originalPrice && (
              <div className='compare'>${data.originalPrice}</div>
            )}
          </div>
          <div className='product-card-caption-name'>{data.name}</div>
        </div>
      </Link>
    </div>
  );
}
