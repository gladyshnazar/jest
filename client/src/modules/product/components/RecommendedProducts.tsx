import SectionHeading from "@/components/SectionHeading";
import SplideTrackProvider from "@/components/providers/SplideProvider";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/redux/shop/types";

type RecommendedProductsType = {
  currentProductId: string;
  data: ProductType[];
};
function RecommendedProducts({
  currentProductId,
  data,
}: RecommendedProductsType) {
  const recommendedProducts = data.filter(
    product => product._id !== currentProductId
  );

  if (recommendedProducts.length === 0) return null;
  return (
    <section className='recommended-products inline-slider'>
      <div className='container'>
        <div className='recommended-products-inner'>
          <SectionHeading>Recommended Products</SectionHeading>
          <SplideTrackProvider hasArrows={true}>
            {recommendedProducts.map(product => (
              <ProductCard key={product._id} data={product} />
            ))}
          </SplideTrackProvider>
        </div>
      </div>
    </section>
  );
}

export default RecommendedProducts;
