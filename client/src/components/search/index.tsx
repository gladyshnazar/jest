import useClickOutside from "@/hooks/use-click-outside";
import React, { useEffect, useRef, useState } from "react";
import { updateQuery } from "@/redux/search/reducer";
import { search } from "@/redux/search/thunks";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import SearchResults from "@components/search/SearchResults";

export default function Search() {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.search);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearhing] = useState<boolean>(false);

  useClickOutside(searchContainerRef, () => setIsSearhing(false));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    dispatch(updateQuery(newQuery));
  };

  const debounceDelay = 180;
  let timerId: NodeJS.Timeout;
  useEffect(() => {
    if (query.length > 2) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        dispatch(search(query));
      }, debounceDelay);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [query, dispatch]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.focus();
    if (query.length > 2) {
      dispatch(search(query));
    }
  };

  const disableSearching = () => {
    setIsSearhing(false);
  };

  return (
    <div ref={searchContainerRef} className={`search ${status}`}>
      <div className='search-spinner'>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          id='search'
          name='search'
          placeholder={
            isSearching
              ? "Try alcohol, gloves, gauze..."
              : `Search for inputs, e.g. syringes, stretchers...`
          }
          className='search-bar'
          onChange={onChange}
          onFocus={() => setIsSearhing(true)}
          ref={inputRef}
        />
        <button
          type='submit'
          className='search-submit'
          disabled={status === "pending"}
        >
          <svg className='icon'>
            <use href='#svg-icon-magnifying-glass'></use>
          </svg>
        </button>
      </form>
      <SearchResults
        isVisible={
          isSearching && (status === "fulfilled" || status === "rejected")
        }
        disableSearching={disableSearching}
      />
    </div>
  );
}
