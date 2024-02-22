import { useSearchParams } from "react-router-dom";
import {
  augmentExistingParams,
  deleteParams,
  removeExistingParamsArrayValue,
  updateParams,
} from "@/modules/shop/utils/url-search-params";
import { FiltersType } from "../hooks/use-filters";

export default function FilterBlock({ filters }: { filters: FiltersType }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='filter-block'>
      <details className='filter-details'>
        <summary className='filter-summary'>
          <span className='filter-summary-heading'>Tags</span>
          <div className='filter-summary-icon'>
            <svg className='icon'>
              <use href='#svg-icon-angle-down'></use>
            </svg>
          </div>
        </summary>
        <ul className='filter-list'>
          <li
            onClick={() => {
              if (filters.tags?.includes("featured")) {
                setSearchParams(
                  removeExistingParamsArrayValue(
                    searchParams,
                    "tags",
                    "featured"
                  )
                );
              } else {
                setSearchParams(
                  augmentExistingParams(searchParams, "tags", "featured")
                );
              }
            }}
            className='filter-list-label'
          >
            <div
              className={`filter-list-checkbox ${
                filters.tags?.includes("featured") ? "checked" : ""
              }`}
            >
              <svg className='icon'>
                <use href='#svg-icon-check'></use>
              </svg>
            </div>
            <span className='filter-list-heading'>Featured</span>
            <span className='filter-list-counter'>320</span>
          </li>
          <li
            onClick={() => {
              if (filters.tags?.includes("sale")) {
                setSearchParams(
                  removeExistingParamsArrayValue(searchParams, "tags", "sale")
                );
              } else {
                setSearchParams(
                  augmentExistingParams(searchParams, "tags", "sale")
                );
              }
            }}
            className='filter-list-label'
          >
            <div
              className={`filter-list-checkbox ${
                filters.tags?.includes("sale") ? "checked" : ""
              }`}
            >
              <svg className='icon'>
                <use href='#svg-icon-check'></use>
              </svg>
            </div>
            <span className='filter-list-heading'>Sale</span>
            <span className='filter-list-counter'>320</span>
          </li>
        </ul>
      </details>
      <details className='filter-details'>
        <summary className='filter-summary'>
          <span className='filter-summary-heading'>Price</span>
          <div className='filter-summary-icon'>
            <svg className='icon'>
              <use href='#svg-icon-angle-down'></use>
            </svg>
          </div>
        </summary>
        <ul className='filter-list'>
          <li
            onClick={() => {
              if (filters.priceRange?.[1] === 50) {
                setSearchParams(deleteParams(searchParams, ["priceRange"]));
              } else {
                setSearchParams(
                  updateParams(searchParams, { priceRange: "0-50" })
                );
              }
            }}
            className='filter-list-label'
          >
            <div
              className={`filter-list-checkbox ${
                filters.priceRange?.[1] === 50 ? "checked" : ""
              }`}
            >
              <svg className='icon'>
                <use href='#svg-icon-check'></use>
              </svg>
            </div>
            <span className='filter-list-heading'>$0 - $50</span>
            <span className='filter-list-counter'>320</span>
          </li>
          <li
            onClick={() => {
              if (filters.priceRange?.[1] === 100) {
                setSearchParams(deleteParams(searchParams, ["priceRange"]));
              } else {
                setSearchParams(
                  updateParams(searchParams, { priceRange: "50-100" })
                );
              }
            }}
            className='filter-list-label'
          >
            <div
              className={`filter-list-checkbox ${
                filters.priceRange?.[1] === 100 ? "checked" : ""
              }`}
            >
              <svg className='icon'>
                <use href='#svg-icon-check'></use>
              </svg>
            </div>
            <span className='filter-list-heading'>$50 - $100</span>
            <span className='filter-list-counter'>320</span>
          </li>
          <li
            onClick={() => {
              if (filters.priceRange?.[1] === 150) {
                setSearchParams(deleteParams(searchParams, ["priceRange"]));
              } else {
                setSearchParams(
                  updateParams(searchParams, { priceRange: "100-150" })
                );
              }
            }}
            className='filter-list-label'
          >
            <div
              className={`filter-list-checkbox ${
                filters.priceRange?.[1] === 150 ? "checked" : ""
              }`}
            >
              <svg className='icon'>
                <use href='#svg-icon-check'></use>
              </svg>
            </div>
            <span className='filter-list-heading'>$100 - $200</span>
            <span className='filter-list-counter'>320</span>
          </li>
          <li
            onClick={() => {
              if (filters.priceRange?.[1] === 200) {
                setSearchParams(deleteParams(searchParams, ["priceRange"]));
              } else {
                setSearchParams(
                  updateParams(searchParams, { priceRange: "150-200" })
                );
              }
            }}
            className='filter-list-label'
          >
            <div
              className={`filter-list-checkbox ${
                filters.priceRange?.[1] === 200 ? "checked" : ""
              }`}
            >
              <svg className='icon'>
                <use href='#svg-icon-check'></use>
              </svg>
            </div>
            <span className='filter-list-heading'>$150 - $200</span>
            <span className='filter-list-counter'>320</span>
          </li>
        </ul>
      </details>
    </div>
  );
}
