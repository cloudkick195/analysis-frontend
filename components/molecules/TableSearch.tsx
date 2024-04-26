import LinkQueryAtoms from 'components/atoms/LinkQuery';
import React from 'react';

interface IProps{
  filter:{
    query: string
    [key: string]: any;
  }
  setSearchValue:any
  children: any
}

const TableSearchMolecules = ({children, filter, setSearchValue}:IProps) => {
    return (
      <div className="mb-7">
      <div className="row align-items-center">
        <div className="col-lg-9 col-xl-8">
          <div className="row align-items-center">
            <div className="col-md-4 my-2 my-md-0">
              <div className="input-icon">
                <input
                  type="text"
                  className="form-control"
                  onChange={event => {
                    setSearchValue({
                      ...filter,
                      page:1,
                      query: event.target.value,
                    });
                  }}
                  value={filter.query}
                  placeholder="Search..."
                  id="kt_datatable_search_query"
                />
                <span>
                  <i className="flaticon2-search-1 text-muted"></i>
                </span>
              </div>
            </div>
            {children}
            {/* <div className="col-md-6 my-2 my-md-0">
              <div className="d-flex align-items-center">
                <label className="col-md-4 mr-3 mb-0 d-none d-md-block">
                  Vai trò:
                </label>
                <SelectDropdown
                  name="role_ids"
                  value={searchValue.role_ids}
                  handleChange={
                    (val: any) => {
                      setSearchValue({
                        ...searchValue,
                        role_ids: val,
                      });
                    }
                  }
                  options={arrFilterRole}
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-lg-3 col-xl-4 mt-5 mt-lg-0 text-right">
        <LinkQueryAtoms className="btn btn-light-warning px-6 font-weight-bold" text="Search" query={filter}/>
        </div>
      </div>
    </div>
    )
}

export default TableSearchMolecules