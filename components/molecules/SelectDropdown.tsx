import React, { useState } from 'react';

interface IProps {
  name: string,
  value: any;
  options: {
    val: string
    name: string
  }[]
  handleChange: any;
}

const SelectDropdown: React.FC<IProps> = ({
  name,
  value,
  options,
  handleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const objOption = new Map()
  
  options.forEach((element)=>{
    objOption.set(element.val, element.name)
  })
  const setChange = (val:any) => {
    handleChange(val == "" ? undefined : val);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown bootstrap-select form-control">
      <select
        value={value}
        name={name}
        className="form-control"
        onChange={setChange}
      >
        {options.map(option => (
          <option key={option.val} value={option.val}>{option.name}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleToggleDropdown}
        className="btn dropdown-toggle btn-light bs-placeholder"
        data-toggle="dropdown"
        title="All"
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">{objOption.get(value || "")}</div>
          </div>{' '}
        </div>
      </button>
      <div
        className={`dropdown-menu ${isOpen ? 'show' : ''}`}
        style={{
          maxHeight: '300px',
          overflow: 'auto',
          minHeight: '133px',
        }}
      >
        <div
          className="inner show"
          role="listbox"
          id="bs-select-2"
        
          aria-activedescendant="bs-select-2-0"
          style={{
            maxHeight: '549.45px',
            overflowY: 'auto',
            minHeight: '121px',
          }}
        >
          <ul
            className="dropdown-menu inner show"
            role="presentation"
            style={{ marginTop: '0px', marginBottom: '0px' }}
          >
            {options.map((option) => (
              <li
                key={option.val}
                className={`dropdown-item ${
                  option.val === value ? 'active' : ''
                }`}
                onClick={() => {
                  setIsOpen(false)
                  setChange(option.val)
                }}
              >
                <span className="text">{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectDropdown;