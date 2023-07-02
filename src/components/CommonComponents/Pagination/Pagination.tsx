import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import './pagination.scss';

type PaginationType = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationType) => (
  <ResponsivePagination
    current={currentPage}
    total={totalPages}
    onPageChange={(p) => onPageChange(p)}
    className="pagination"
  />
);

export default Pagination;
