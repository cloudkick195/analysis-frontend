import React, { useState } from "react";
import SelectDropdown from "./SelectDropdown";
interface IProps{
  className?: string
  showCheckbox: boolean
  value: string
  options: any
  handleApply: any
  handleChange:any
  setShowCheckbox:any
} 
const AddRole: React.FC<IProps> = ({
  className,
  showCheckbox,
  value,
  options,
  handleApply,
  handleChange,
  setShowCheckbox
}) => {


  const handleCancelSelection = () => {
    setShowCheckbox(false);
  };

  const handleCheckboxToggle = () => {
    setShowCheckbox(!showCheckbox);
  };

  return (
    <>
     <div className={className || "mt-10 mb-7"}>
      {showCheckbox ? (
        <div className="row">
          <div className="col-md-4 my-2 my-md-0">
            <div className="d-flex align-items-center">
              <label className="mr-3 mb-0 d-none d-md-block">Status:</label>
              <SelectDropdown
                name="role_ids"
                value={value}
                handleChange={handleChange}
                options={options}
              />
            </div>
          </div>
          <div className="col-md-8 my-2 my-md-0">
            <button
              className="btn btn-warning px-6 font-weight-bold mr-5"
              onClick={handleApply}
            >
              Apply Roles
            </button>
            <button
              className="btn btn-danger px-6 font-weight-bold  mr-5"
              onClick={handleCancelSelection}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-warning px-6 font-weight-bold"
          onClick={handleCheckboxToggle}
        >
          Add Roles
        </button>
      )}
      </div>
    </>
  );
};

export default AddRole;