import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchFeaturedProducts } from "@/redux/shop/thunks";
import { useEffect } from "react";

export default function useFeaturedProducts() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(state => state.shop.featured);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFeaturedProducts());
    }
  }, [dispatch]);

  const isLoading = status === "pending";

  // return the import data for the caller of the hook to use
  return { data, isLoading, error };
}
