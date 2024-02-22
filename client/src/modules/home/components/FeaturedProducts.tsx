import SectionHeading from "@components/SectionHeading";
import ProductCard from "@components/ProductCard";
import { Link } from "react-router-dom";
import useFeaturedProducts from "../hooks/use-featured-products";
import SplideTrackProvider from "@/components/providers/SplideProvider";
import links from "@/constants/links";

export default function FeaturedProducts() {
  const { data, error } = useFeaturedProducts();

  return (
    <section className='featured-products-section inline-slider'>
      <div className='container'>
        <div className='featured-products-inner'>
          <SectionHeading>Featured products</SectionHeading>
          <SplideTrackProvider hasArrows={true}>
            {data.map(product => (
              <ProductCard key={product._id} data={product} />
            ))}
          </SplideTrackProvider>
          <Link to={links.shop.category("featured")} className='red seemore'>
            See more
          </Link>
        </div>
      </div>
    </section>
  );
}
