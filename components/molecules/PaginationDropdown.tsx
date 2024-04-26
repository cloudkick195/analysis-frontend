import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { buildQueries } from 'utils/general';

interface PaginationDropdownProps {
  perPage: number;
  options: number[]
  onLimitChange: any;
  query:any
}

const PaginationDropdownMolecules: React.FC<PaginationDropdownProps> = ({ perPage, options, onLimitChange,query }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const {queries, queriesFull} = buildQueries(query, ["page", "limit"])

  return (
    <div className={`dropdown bootstrap-select datatable-pager-size ${isOpen ? 'show' : ''}`} style={{ width: '80px' }}>
      <button
        type="button"
        className="btn dropdown-toggle btn-light"
        data-toggle="dropdown"
        aria-expanded={isOpen ? "true" : "false"}
        title="Select page size"
        onClick={handleToggleDropdown}
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">{perPage}</div>
          </div>
        </div>
      </button>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <div className="inner" role="listbox" id="bs-select-3">
          <ul className="dropdown-menu inner" role="presentation">
            {options.map(option => (
              <li key={option} className={`dropdown-item ${option === perPage ? 'active' : ''}`} onClick={() => {
                let queriesPage = `?page=${1}&limit=${option}`
                if(queries.length > 0 ) queriesPage += "&" + queriesFull
                onLimitChange(option)
                router.push(`${router.asPath.split('?')[0]}${queriesPage}`)
                handleToggleDropdown()
              }}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaginationDropdownMolecules;