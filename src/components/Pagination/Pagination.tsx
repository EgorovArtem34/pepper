import { Pagination as BootstrapPagination } from 'react-bootstrap';

type PaginationType = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationType) => (
  <BootstrapPagination>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
      <BootstrapPagination.Item
        key={pageNumber}
        active={pageNumber === currentPage}
        onClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </BootstrapPagination.Item>
    ))}
  </BootstrapPagination>
);

export default Pagination;
