import { HTMLAttributes, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type ImageWithSkeletonPropsType = HTMLAttributes<HTMLImageElement> & {
  alt: string;
  src: string;
  skeletonHeight?: string;
  condition?: boolean;
};
export default function ImageWithSkeleton({
  alt,
  src,
  skeletonHeight = "100%",
  condition = true,
  ...rest
}: ImageWithSkeletonPropsType) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div style={{ minHeight: skeletonHeight, width: "100%", height: "100%" }}>
      <img
        onLoad={handleImageLoad}
        style={
          isImageLoaded && condition
            ? { display: "block" }
            : { display: "none" }
        }
        alt={alt}
        src={src}
        {...rest}
      />
      <Skeleton
        style={
          isImageLoaded && condition
            ? {
                display: "none",
              }
            : {
                display: "block",
              }
        }
        height='100%'
      />
    </div>
  );
}
