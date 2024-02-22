import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";
import { fetchUser } from "@/redux/user/thunks";
import { setModal } from "@/redux/modal/reducer";
import { ProductType } from "@/redux/shop/types";
import useUser from "./use-user";

type CartType =
  | {
      data: ProductType[];
      isLoading: false;
      error: null;
    }
  | {
      data: null;
      isLoading: false;
      error: string;
    }
  | {
      data: null;
      isLoading: true;
      error: null;
    }
  | { data: null; isLoading: false; error: null };
export default function useCart() {
  const dispatch = useAppDispatch();
  const { data: user } = useUser();

  const [cartState, setCartState] = useState<CartType>({
    data: null,
    isLoading: false,
    error: null,
  });

  const [cartSummary, setCartSummary] = useState<{
    totalProducts: number;
    totalPrice: number;
  }>({
    totalProducts: 0,
    totalPrice: 0,
  });

  /* Add product from cart */
  const handleAddToCart = async (productId: string) => {
    setCartState({ data: null, isLoading: true, error: null });

    try {
      const res = await axios.post(
        endpoints.user.profile.cart.add,
        { productId },
        {
          withCredentials: true,
        }
      );
      setCartState({ data: res.data, isLoading: false, error: null });
      dispatch(fetchUser());
      dispatch(setModal("added-to-cart"));
    } catch (err: any) {
      setCartState({
        data: null,
        isLoading: false,
        error: err.response?.data?.error || "An error occurred",
      });
    }
  };

  /* Remove product from cart */
  const handleRemoveProductFromCart = async (productId: string) => {
    setCartState({ data: null, isLoading: true, error: null });

    try {
      const res = await axios.post(
        endpoints.user.profile.cart.remove,
        { productId },
        {
          withCredentials: true,
        }
      );
      setCartState({
        data: res.data,
        isLoading: false,
        error: null,
      });
      dispatch(fetchUser());
    } catch (err: any) {
      setCartState({
        data: null,
        isLoading: false,
        error: err.response?.data?.error || "An error occurred",
      });
    }
  };

  /* Increase product quantity in cart */
  const handleIncreaseProductQuantity = async (productId: string) => {
    setCartState({ data: null, isLoading: true, error: null });

    try {
      const res = await axios.post(
        endpoints.user.profile.cart.increaseQuantity,
        { productId },
        {
          withCredentials: true,
        }
      );
      setCartState({
        data: res.data,
        isLoading: false,
        error: null,
      });
      dispatch(fetchUser());
    } catch (err: any) {
      setCartState({
        data: null,
        isLoading: false,
        error: err.response?.data?.error || "An error occurred",
      });
    }
  };

  /* Decrease product quantity in cart */
  const handleDecreaseProductQuantity = async (productId: string) => {
    setCartState({ data: null, isLoading: true, error: null });

    try {
      const res = await axios.post(
        endpoints.user.profile.cart.decreaseQuantity,
        { productId },
        {
          withCredentials: true,
        }
      );
      setCartState({
        data: res.data,
        isLoading: false,
        error: null,
      });
      dispatch(fetchUser());
    } catch (err: any) {
      setCartState({
        data: null,
        isLoading: false,
        error: err.response?.data?.error || "An error occurred",
      });
    }
  };

  /* Calculate cart summary */
  useEffect(() => {
    console.log("render useEffect within useCart");
    if (!user) return;

    const totalProducts = user.cart.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    const totalPrice = +user.cart
      .reduce(
        (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
        0
      )
      .toFixed(2);

    setCartSummary({ totalProducts, totalPrice });
  }, [user]);

  return {
    actions: {
      handleAddToCart,
      handleRemoveProductFromCart,
      handleIncreaseProductQuantity,
      handleDecreaseProductQuantity,
    },
    cartState,
    cartSummary,
  };
}
