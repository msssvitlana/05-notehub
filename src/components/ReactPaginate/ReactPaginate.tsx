
import ReactPaginate from 'react-paginate';
import styles from '../App/App.module.css'; 



interface PaginatedItemsProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginatedItems({
  pageCount,
  currentPage,
  onPageChange,
}: PaginatedItemsProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
    />
  );
}
