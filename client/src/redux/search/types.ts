import { ProductType } from "../shop/types";
import { StatusType } from "../types";

export type SearchState = {
  query: string;
  data: ProductType[];
  status: StatusType;
  error: string | null;
};
