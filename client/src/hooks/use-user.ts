import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectUser } from "@/redux/user/selectors";
import { fetchUser } from "@/redux/user/thunks";
import axios from "@/configs/axios-config";
import { clearUser } from "@/redux/user/reducer";
import { useNavigate } from "react-router-dom";

import { AuthenticationFormType } from "@/components/modals/Authentication";
import { endpoints } from "@/constants/endpoints";

export default function useUser() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(selectUser);
  const navigate = useNavigate();

  const signIn = async (data: AuthenticationFormType) => {
    const response = await axios.post(endpoints.user.signin, data, {
      withCredentials: true,
    });
    dispatch(fetchUser());
    return response.data;
  };

  const signUp = async (data: AuthenticationFormType) => {
    const response = await axios.post(endpoints.user.signup, data);
    return response.data;
  };

  async function signOut() {
    await axios.post(endpoints.user.signout, {}, { withCredentials: true });

    dispatch(clearUser());
    navigate("/");
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const isLoading = status === "pending";

  // return the import data for the caller of the hook to use
  return { data, isLoading, error, signIn, signUp, signOut };
}
