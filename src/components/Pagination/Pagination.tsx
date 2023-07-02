import { Pagination as BootstrapPagination } from 'react-bootstrap';
import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

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
  />
);

export default Pagination;
