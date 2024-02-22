import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchDiscountedProducts } from "@/redux/shop/thunks";
import { useEffect } from "react";

export default function useDiscountedProducts(currentProductId: string) {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(
    state => state.shop.discounted
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDiscountedProducts());
    }
  }, [dispatch]);

  const filteredData = data.filter(product => product._id !== currentProductId);

  const isLoading = status === "pending";

  // return the import data for the caller of the hook to use
  return { data: filteredData, isLoading, error };
}
