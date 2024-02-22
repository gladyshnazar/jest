import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";
import { ProductType } from "@/redux/shop/types";
import { useEffect, useState } from "react";

export default function useProduct(slug: string) {
  const [data, setData] = useState<ProductType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async function () {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios.get(endpoints.shop.product(slug), {
        withCredentials: true,
      });
      setData(res.data);
    } catch (err: any) {
      setError(err.response.data.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  // return the import data for the caller of the hook to use
  return { data, isLoading, error };
}
