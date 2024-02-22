import { useAppSelector } from "@/hooks/redux";
import SearchedProductCard from "@components/search/SearchProductCard";

type SearchResultsType = {
  isVisible: boolean;
  disableSearching: () => void;
};
export default function SearchResults({
  isVisible,
  disableSearching,
}: SearchResultsType) {
  const { data, query, status, error } = useAppSelector(state => state.search);

  if (isVisible) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <div className={`search-results ${isVisible ? "visible" : ""}`}>
      <div className='search-results-container'>
        {data.length !== 0 && (
          <div className='search-results-products'>
            <h3>Products</h3>
            {data.map(product => (
              <SearchedProductCard
                key={product._id}
                data={product}
                disableSearching={disableSearching}
              />
            ))}
          </div>
        )}
        {data.length === 0 && (
          <div className='search-results-noresults'>
            <div className='search-results-noresults-icon'>
              <svg className='icon'>
                <use href='#svg-icon-magnifying-glass'></use>
              </svg>
            </div>
            <div className='search-results-noresults-text'>
              <h2 className='search-results-noresults-text-heading'>
                {status === "rejected"
                  ? `An error occured! ${error}`
                  : `No results found for “${query}”`}
              </h2>
              <p className='search-results-noresults-text-subheading'>
                {status === "rejected"
                  ? `Try again or contact us`
                  : `Check spelling or try different keywords`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
