import { useState } from "react";
import axios from "axios";
import { endpoints } from "@/constants/endpoints";
import { EditUserProfileFormType } from "../components/UserProfile";
import { fetchUser } from "@/redux/user/thunks";
import { useAppDispatch } from "@/hooks/redux";

export default function useEditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const editProfile = async (data: EditUserProfileFormType) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios.post(endpoints.user.profile.edit.info, data, {
        withCredentials: true,
      });
      setData(res.data.message as string);
      dispatch(fetchUser());
    } catch (error: any) {
      setError(error.response.data.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { editProfile, isLoading, data, error };
}
