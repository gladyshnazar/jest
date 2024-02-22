import { useRef } from "react";
import useClickOutside from "@/hooks/use-click-outside";
import useToggle from "@/hooks/use-toggle";
import {
  deleteParams,
  updateParams,
} from "@/modules/shop/utils/url-search-params";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import { SortType } from "../hooks/use-filters";

type ShopToolbarType = {
  isLoading: boolean;
  productsCount: number;
  sort: SortType;
};
export default function ShopToolbar({
  isLoading,
  productsCount,
  sort,
}: ShopToolbarType) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isDropdownOpened, toggleDropdown] = useToggle(false);

  const selectRef = useRef<HTMLDivElement>(null);
  useClickOutside(selectRef, () => toggleDropdown(false));

  const handleSort = (sortField: SortType) => {
    setSearchParams(prevSearchParams =>
      sortField === null
        ? deleteParams(prevSearchParams, ["sort"])
        : updateParams(prevSearchParams, {
            sort: sortField,
          })
    );
  };

  return (
    <div className='shop-toolbar-section'>
      <div className='container'>
        <div className='shop-toolbar-inner'>
          <div className='shop-toolbar-count'>
            {isLoading ? (
              <Skeleton width={70} />
            ) : productsCount === 0 ? (
              `No products`
            ) : productsCount === 1 ? (
              `1 product`
            ) : (
              `${productsCount} products`
            )}
          </div>
          <div className='shop-toolbar-sort'>
            <span className='shop-toolbar-sort-span mobile-hidden'>
              Sort by:
            </span>
            <div ref={selectRef} className='shop-toolbar-sort-select'>
              <div
                className='shop-toolbar-sort-select-toggle'
                onClick={() => toggleDropdown()}
              >
                <span>
                  {isLoading ? (
                    <Skeleton width={70} />
                  ) : (
                    options.find(option => option.value === sort)?.title
                  )}
                </span>
                <svg className='icon'>
                  <use href='#svg-icon-angle-down'></use>
                </svg>
              </div>
              {isDropdownOpened && (
                <ul className='shop-toolbar-sort-select-dropdown'>
                  {options.map((option, index) => (
                    <li key={index} onClick={() => handleSort(option.value)}>
                      {option.title}
                      {option.value === sort && (
                        <svg className='icon'>
                          <use href='#svg-icon-check'></use>
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SortOptionsType = {
  title: string;
  value: SortType;
}[];
export const options: SortOptionsType = [
  {
    title: "Default",
    value: null,
  },
  {
    title: "Price (low to high)",
    value: "price-lth",
  },
  {
    title: "Price (high to low)",
    value: "price-htl",
  },
  {
    title: "Date (old to recent)",
    value: "date-otr",
  },
  {
    title: "Date (recent to old)",
    value: "date-rto",
  },
];
