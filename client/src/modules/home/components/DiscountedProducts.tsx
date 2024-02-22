import { Link } from "react-router-dom";

import SectionHeading from "@components/SectionHeading";
import ProductCard from "@components/ProductCard";
import SplideTrackProvider from "@/components/providers/SplideProvider";

import useDiscountedProducts from "../hooks/use-discounted-products";
import links from "@/constants/links";

export default function DiscountedProducts() {
  const { data, error } = useDiscountedProducts();

  return (
    <section className='discounted-products-section inline-slider'>
      <div className='container'>
        <div className='discounted-products-inner'>
          <SectionHeading>Discounted products</SectionHeading>
          <SplideTrackProvider hasArrows={true}>
            {data.map(product => (
              <ProductCard key={product._id} data={product} />
            ))}
          </SplideTrackProvider>
          <Link to={links.shop.category("discounted")} className='red seemore'>
            See more
          </Link>
        </div>
      </div>
    </section>
  );
}
