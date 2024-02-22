import Brands from "@/modules/home/components/Brands";
import Hero from "@/modules/home/components/Hero";
import PurchaseProcess from "@/modules/home/components/PurchaseProcess";
import Satisfied from "@/modules/home/components/Satisfied";
import FeaturedProducts from "@/modules/home/components/FeaturedProducts";
import Categories from "@/modules/home/components/Categories";
import DiscountedProducts from "@/modules/home/components/DiscountedProducts";
import Testimonials from "@/modules/home/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Satisfied />
      <PurchaseProcess />
      <FeaturedProducts />
      <Categories />
      <DiscountedProducts />
      <Testimonials />
    </>
  );
}
