import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchDiscountedProducts } from "@/redux/shop/thunks";
import { useEffect } from "react";

export default function useDiscountedProducts() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(state => state.shop.discounted);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDiscountedProducts());
    }
  }, [dispatch]);

  const isLoading = status === "pending";

  // return the import data for the caller of the hook to use
  return { data, isLoading, error };
}
