import React from 'react';

const SearchMolecules = () => {
  return (
    <div className="row align-items-center">
      <div className="col-lg-9 col-xl-8">
        <div className="row align-items-center">
          <div className="col-md-4 my-2 my-md-0">
            <div className="input-icon">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <span>
                <i className="flaticon2-search-1 text-muted"></i>
              </span>
            </div>
          </div>
          <div className="col-md-4 my-2 my-md-0">
            <div className="d-flex align-items-center">
              <label className="mr-3 mb-0 d-none d-md-block">Status:</label>
              <div className="dropdown bootstrap-select form-control">
                <select className="form-control">
                  <option value="">All</option>
                  <option value="1">Pending</option>
                  <option value="2">Delivered</option>
                  <option value="3">Canceled</option>
                  <option value="4">Success</option>
                  <option value="5">Info</option>
                  <option value="6">Danger</option>
                </select>
                <button
                  type="button"
                  className="btn dropdown-toggle btn-light bs-placeholder"
                  data-toggle="dropdown"
                  title="All">
                  <div className="filter-option">
                    <div className="filter-option-inner">
                      <div className="filter-option-inner-inner">All</div>
                    </div>{' '}
                  </div>
                </button>
                <div className="dropdown-menu ">
                  <div className="inner show" role="listbox">
                    <ul
                      className="dropdown-menu inner show"
                      role="presentation"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-2 my-md-0">
            <div className="d-flex align-items-center">
              <label className="mr-3 mb-0 d-none d-md-block">Type:</label>
              <div className="dropdown bootstrap-select form-control">
                <select className="form-control">
                  <option value="">All</option>
                  <option value="1">Online</option>
                  <option value="2">Retail</option>
                  <option value="3">Direct</option>
                </select>
                <button
                  type="button"
                  className="btn dropdown-toggle btn-light bs-placeholder"
                  data-toggle="dropdown"
                  title="All">
                  <div className="filter-option">
                    <div className="filter-option-inner">
                      <div className="filter-option-inner-inner">All</div>
                    </div>
                  </div>
                </button>
                <div className="dropdown-menu ">
                  <div className="inner show" role="listbox">
                    <ul
                      className="dropdown-menu inner show"
                      role="presentation"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-xl-4 mt-5 mt-lg-0">
        <span className="btn btn-light-warning px-6 font-weight-bold">
          Search
        </span>
      </div>
    </div>
  );
};

export default SearchMolecules;
