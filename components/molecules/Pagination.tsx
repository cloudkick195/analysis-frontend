import React from 'react';
import { PaginationLink } from 'components/atoms';
import { PaginationDropdown } from 'components/molecules';
import { Listlimit } from 'utils/enum';
import { useRouter } from 'next/router';
import { buildQueries } from 'utils/general';

interface PaginationProps {
  query:any;

  total: number;
  onPageChange: (i: number) => void;
  onLimitChange: (i: number) => void;
}
const PaginationMolecules = ({
  query,
  total,
  onPageChange,
  onLimitChange,
}: PaginationProps) => {
  const router = useRouter()
  const totalPages = Math.ceil(total / query.limit);
  const { queries, queriesFull } = buildQueries(query, ["page"]);
  
  const renderPaginationLinks = (query:any) => {
    const links = [];

   
    // Tính toán khoảng các trang để hiển thị
    let startPage = Math.max(1, query.page - 2);
    let endPage = Math.min(query.page + 2, totalPages);
    if (startPage < 1) {
      endPage += Math.abs(startPage - 1);
      startPage = 1;
    }
    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }
  
    // Thêm số đầu
    if (startPage > 1) {
      links.push(
        <PaginationLink
          key={1}
          title="1"
          page={1}
          isActive={1 === parseInt(query.page)}
          onClick={() => {
            onPageChange(1);
            router.push(
              `${router.asPath.split("?")[0]}?page=1${queries.length > 0 ? "&" + queriesFull : ""}`
            );
          }}
        />
      );
      if (startPage > 2) {
        links.push(<li><span key="ellipsis-start" className="datatable-pager-ellipsis">&hellip;</span></li>);
      }
    }
  
    // Thêm dãy số trang
    for (let i = startPage; i <= endPage; i++) {
      const queriesPage = `?page=${i}${queries.length > 0 ? "&" + queriesFull : ""}`;
  
      links.push(
        <PaginationLink
          key={i + 1}
          title={i + ""}
          page={i}
          isActive={i === parseInt(query.page)}
          onClick={() => {
            onPageChange(i);
            router.push(`${router.asPath.split("?")[0]}${queriesPage}`);
          }}
        />
      );
    }
  
    // Thêm số cuối
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        links.push(<li><span key="ellipsis-end" className="datatable-pager-ellipsis">&hellip;</span></li>);
      }
      links.push(
        <PaginationLink
          key={totalPages}
          title={totalPages + ""}
          page={totalPages}
          isActive={totalPages === parseInt(query.page)}
          onClick={() => {
            onPageChange(totalPages);
            router.push(
              `${router.asPath.split("?")[0]}?page=${totalPages}${queries.length > 0 ? "&" + queriesFull : ""}`
            );
          }}
        />
      );
    }
  
    return links;
  };

  return (
    <div className="datatable-pager datatable-paging-loaded">
      <ul className="datatable-pager-nav my-2 mb-sm-0">
        {/* <li>
          <a
            title="First"
            className="datatable-pager-link datatable-pager-link-first datatable-pager-link-disabled"
            data-page="1">
            <i className="flaticon2-fast-back"></i>
          </a>
        </li> */}
    <li>
      <span
        title="Trang trước"
        className={`${
          query.page > 1 ? "" : "datatable-pager-link-disabled"
        } datatable-pager-link datatable-pager-link-prev`}
        data-page="1"
        onClick={() => {
          if (query.page > 1) {
            onPageChange(query.page - 1);
            router.push(
              `${router.asPath.split("?")[0]}?page=${query.page - 1}${queries.length > 0 ? "&" + queriesFull : ""}`
            );
          }
        }}
      >
        <i className="flaticon2-back"></i>
      </span>
    </li>
{renderPaginationLinks(query)}
<li>
  <span
    title="Trang sau"
    className={`${
      query.page < totalPages ? "" : "datatable-pager-link-disabled"
    } datatable-pager-link datatable-pager-link-next`}
    data-page={query.page + 1}
    onClick={() => {
      if (query.page < totalPages) {
        onPageChange(query.page + 1);
        router.push(
          `${router.asPath.split("?")[0]}?page=${query.page + 1}${queries.length > 0 ? "&" + queriesFull : ""}`
        );
      }
    }}
  >
    <i className="flaticon2-next"></i>
  </span>
</li>
        {/* <li>
          <a
            title="Last"
            className="datatable-pager-link datatable-pager-link-last"
            data-page={totalPages}>
            <i className="flaticon2-fast-next"></i>
          </a>
        </li> */}
      </ul>
      <div className="datatable-pager-info my-2 mb-sm-0">
        <PaginationDropdown query={query} perPage={query.limit} onLimitChange={onLimitChange} options={Listlimit} />
        <span className="datatable-pager-detail">
          Showing {(query.page - 1) * query.limit + 1} - {Math.min(query.page * query.limit, total)} of{' '}
          {total}
        </span>
      </div>
    </div>
  );
};

export default PaginationMolecules;
