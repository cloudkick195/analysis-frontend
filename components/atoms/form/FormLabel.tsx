import React from 'react';

const FormLabel = (props: any) => {
  const { label, required, children, inline, className } = props

  return (
    <label className={`${inline ? 'mb-0 flex-grow-1' : ''} ${className ? className : 'form-control-label'}`}>
      {label || children} {required && <span className="text-danger">*</span>}
    </label>
  );
};

export default FormLabel;
