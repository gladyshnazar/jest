import { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";
import { fetchUser } from "@/redux/user/thunks";
import { setModal } from "@/redux/modal/reducer";
import { ProductType } from "@/redux/shop/types";
import { handleCheckout } from "@/utils/checkout";

export default function useProductActions() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const handleAddToCart = async (productId: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios.post(
        endpoints.user.profile.cart.add,
        { productId },
        {
          withCredentials: true,
        }
      );
      setData(res.data);
      dispatch(fetchUser());
      setIsLoading(false);
      dispatch(setModal("added-to-cart"));
    } catch (err: any) {
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };


  return { handleAddToCart, data, isLoading, error };
}
