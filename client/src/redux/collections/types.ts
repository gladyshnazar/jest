import { ErrorType, StatusType } from "@/redux/types";

type Subcategory = {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  products: [];
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  subcategories: Subcategory[];
  products: [];
};

export type CollectionsState = {
  data: Category[];
  status: StatusType;
  error: ErrorType;
};
