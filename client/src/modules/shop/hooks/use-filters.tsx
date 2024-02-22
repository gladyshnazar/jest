import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type SortType =
  | null
  | "price-lth"
  | "price-htl"
  | "date-otr"
  | "date-rto";
export type FiltersType = {
  tags: string[] | null;
  priceRange: [number, number] | null;
  sort: SortType;
};

export default function useFilters() {
  const [searchParams] = useSearchParams();

  const [tags, setTags] = useState<string[] | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sort, setSort] = useState<SortType>(null);

  /* Sync filters state and search params */
  useEffect(() => {
    if (searchParams.get("tags")) {
      setTags(searchParams.getAll("tags"));
    } else {
      setTags(null);
    }

    if (searchParams.get("priceRange")) {
      const priceRange = searchParams
        .get("priceRange")
        ?.split("-")
        .map(Number) as [number, number];
      setPriceRange(priceRange);
    } else {
      setPriceRange(null);
    }

    if (searchParams.get("sort")) {
      setSort(searchParams.get("sort") as SortType);
    } else {
      setSort(null);
    }
  }, [searchParams]);

  const filters = { tags, priceRange, sort };
  return filters;
}
