import { useState } from "react";
import axios from "axios";
import { endpoints } from "@/constants/endpoints";

export default function useEditPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<string | null>(null);

  const editPassword = async (password: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios.post(
        endpoints.user.profile.edit.password,
        { password },
        { withCredentials: true }
      );
      setData(res.data.message as string);
    } catch (error: any) {
      setError(error.response.data.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { editPassword, isLoading, data, error };
}
