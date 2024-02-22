import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchAllProducts,
  fetchDiscountedProducts,
  fetchFeaturedProducts,
  fetchProductsByCategorySlug,
} from "@/redux/shop/thunks";
import { useEffect, useMemo } from "react";
import useFilters from "./use-filters";

export default function useShop(slug: string) {
  const dispatch = useAppDispatch();
  const filters = useFilters();

  /* Select the appropriate slice of state based on the slug value */
  const { data, status, error } = useAppSelector(state => {
    switch (slug) {
      case "all":
        return state.shop.all;
      case "featured":
        return state.shop.featured;
      case "discounted":
        return state.shop.discounted;
      default:
        return state.shop.byCategory;
    }
  });

  useEffect(() => {
    switch (slug) {
      case "all":
        if (status === "idle") {
          dispatch(fetchAllProducts());
        }
        break;
      case "featured":
        if (status === "idle") {
          dispatch(fetchFeaturedProducts());
        }
        break;
      case "discounted":
        if (status === "idle") {
          dispatch(fetchDiscountedProducts());
        }
        break;
      default:
        dispatch(fetchProductsByCategorySlug(slug));
    }
  }, [dispatch, slug]);

  /* Filtering and sorting functionality:
   Filter and sort products based on filters in the Redux state */
  const filteredData = useMemo(() => {
    return (
      data
        /* Filter based on tags */
        .filter(product => {
          if (filters.tags && filters.tags.length > 0) {
            const hasSaleTag = filters.tags.includes("sale");
            const hasFeaturedTag = filters.tags.includes("featured");

            /* Keep the product if it matches the selected tags */
            return (
              (!hasSaleTag || product.isDiscounted) &&
              (!hasFeaturedTag || product.isFeatured)
            );
          }

          /* Include all products if no tags are selected */
          return true;
        })

        /*  Filter based on price range */
        .filter(product => {
          if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange;
            return product.price >= minPrice && product.price <= maxPrice;
          }
          return true;
        })

        /* Sort based on selected sorting option */
        .sort((a, b) => {
          switch (filters.sort) {
            case "price-lth":
              return a.price - b.price;
            case "price-htl":
              return b.price - a.price;
            case "date-otr":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            case "date-rto":
              return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              );
            default:
              return 0;
          }
        })
    );
  }, [data, filters.tags, filters.priceRange, filters.sort]);

  const isLoading = status === "pending";

  // Return the imported data for the caller of the hook to use
  return { data: filteredData, isLoading, error };
}
