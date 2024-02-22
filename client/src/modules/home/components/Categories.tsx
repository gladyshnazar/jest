import { Link } from "react-router-dom";
import SectionHeading from "@components/SectionHeading";
import useCollections from "@/hooks/use-collections";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import links from "@/constants/links";

export default function Categories() {
  const { data: collections } = useCollections();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section className='categories-section'>
      <div className='container'>
        <SectionHeading>Categories to explore</SectionHeading>
        <div className='categories-grid'>
          {collections.map(category => (
            <div key={category._id} className='hover'>
              <Link to={links.shop.category(category.slug)}>
                <img
                  onLoad={handleImageLoad}
                  src={category.imageUrl}
                  style={{ display: imageLoaded ? "block" : "none" }}
                  alt={category.name}
                />
                {
                  <Skeleton
                    style={{ display: imageLoaded ? "none" : "block" }}
                    width='100%'
                    height='100%'
                  />
                }
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
