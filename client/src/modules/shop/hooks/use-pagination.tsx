import { useState } from "react";
import Pagination from "../components/Pagination";

export default function usePagination<T>(data: T[], postsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginatedData = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  const pagination = (
    <Pagination
      postsPerPage={postsPerPage}
      totalPosts={data.length}
      paginate={paginate}
      currentPage={currentPage}
    />
  );

  return { data: paginatedData, pagination } as const;
}
