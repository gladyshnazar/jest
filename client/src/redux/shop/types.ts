import { ErrorType, StatusType } from "@/redux/types";

type CategoryType = {
  _id: string;
  name: string;
  parentCategory?: string;
  slug: string;
  products: ProductType[];
};

export type ProductWithCategoryType = ProductType & { category: CategoryType };

export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  imageUrls: string[];
  price: number;
  originalPrice?: number;
  isDiscounted: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductsStateType = {
  individual: {
    data: ProductWithCategoryType | null;
    status: StatusType;
    error: ErrorType;
  };
  byCategory: {
    data: ProductType[];
    status: StatusType;
    error: ErrorType;
  };
  featured: {
    data: ProductType[];
    status: StatusType;
    error: ErrorType;
  };
  discounted: {
    data: ProductType[];
    status: StatusType;
    error: ErrorType;
  };
  all: {
    data: ProductType[];
    status: StatusType;
    error: ErrorType;
  };
};
