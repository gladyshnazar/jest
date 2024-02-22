import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCollections } from "@/redux/collections/selectors";
import { fetchCollections } from "@/redux/collections/thunks";
import { useEffect } from "react";

export default function useCollections() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(selectCollections);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCollections());
    }
  }, [dispatch]);

  const isLoading = status === "pending";

  // return the import data for the caller of the hook to use
  return { data, isLoading, error };
}
