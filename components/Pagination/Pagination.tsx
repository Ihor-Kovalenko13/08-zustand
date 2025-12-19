import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  onPageChange,
}: PaginationProps) {
  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={4}
        nextLabel="->"
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        previousLabel="<-"
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        // renderOnZeroPageCount={null}
      />
    </>
  );
}