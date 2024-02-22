import SectionHeading from "@components/SectionHeading";
import ProductCard from "@components/ProductCard";
import SplideTrackProvider from "@/components/providers/SplideProvider";

import useDiscountedProducts from "../hooks/use-discounted-products";
import SpinnerProvider from "@/components/providers/SpinnerProvider";
import { Link } from "react-router-dom";
import links from "@/constants/links";

export default function DiscountedProducts({
  currentProductId,
}: {
  currentProductId: string;
}) {
  const { data, isLoading } = useDiscountedProducts(currentProductId);

  return (
    <SpinnerProvider isSpinning={isLoading} hideContent variant='lg'>
      <section className='discounted-products-section inline-slider'>
        <div className='container'>
          <div className='discounted-products-inner'>
            <SectionHeading>Discounted products</SectionHeading>
            <SplideTrackProvider hasArrows={true}>
              {data.map(product => (
                <ProductCard key={product._id} data={product} />
              ))}
            </SplideTrackProvider>
            <Link
              to={links.shop.category("discounted")}
              className='red seemore'
            >
              See more
            </Link>
          </div>
        </div>
      </section>
    </SpinnerProvider>
  );
}
