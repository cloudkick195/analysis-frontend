import React, { useState } from 'react';

const PasswordAtoms = (props:any) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='passwork-field-eye'>
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
      />
      <span className="toggle-pass" onClick={togglePasswordVisibility}>
      <i className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'}></i>
      </span>
    </div>
  );
};

export default PasswordAtoms;