import links from "@/constants/links";
import { ProductType } from "@/redux/shop/types";
import { Link } from "react-router-dom";

type SearchedProductCardProps = {
  data: ProductType;
  disableSearching: () => void;
};
export default function SearchedProductCard({
  data,
  disableSearching,
}: SearchedProductCardProps) {
  return (
    <Link to={links.product(data.slug)} onClick={disableSearching}>
      <div className='search-results-product'>
        <div className='search-results-product-media'>
          <img src={data.imageUrls[0]} alt={data.name} />
        </div>
        <div className='search-results-product-body'>
          <h5 className='search-results-product-body-title'>{data.name}</h5>
          <div className='search-results-product-body-prices'>
            <div className='regular'>${data.price}</div>
            {data.originalPrice && (
              <div className='original'>{data.originalPrice}</div>
            )}
          </div>
        </div>
        <div className='search-results-product-arrow'>
          <svg className='icon'>
            <use href='#svg-icon-arrow-left'></use>
          </svg>
        </div>
      </div>
    </Link>
  );
}
