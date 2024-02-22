type PaginationType = {
  postsPerPage: number;
  totalPosts: number;
  paginate: (page: number) => void;
  currentPage: number;
};

function Pagination({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: PaginationType) {
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <ul className='pagination'>
      {pages.map(page => (
        <li
          onClick={() => paginate(page)}
          key={page}
          className={`pagination-page ${
            page === currentPage ? "current" : ""
          }`}
        >
          {page}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
