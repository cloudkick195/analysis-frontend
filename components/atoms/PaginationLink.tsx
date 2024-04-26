// components/atoms/PaginationLink.js
import React from 'react';
interface PaginationLinkProps {
  title: string;
  className?: string;
  page: number;
  isActive: boolean;
  onClick:any
}
const PaginationLinkAtoms = ({ title, page, isActive, onClick, className }:PaginationLinkProps) => {
  return (
    <li>
      <span
        title={title}
        className={`${className ? className :"datatable-pager-link datatable-pager-link-number"} ${isActive ? 'datatable-pager-link-active' : ''}`}
        data-page={page}
        onClick={onClick}
      >
        {title}
      </span>
    </li>
  );
};

export default PaginationLinkAtoms;