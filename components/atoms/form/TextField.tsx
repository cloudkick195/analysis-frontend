import React from 'react';
import { Box } from '@mui/material';
import { styled, css } from '@mui/material/styles';

const TextFieldAtom = (props: any) => {
  const { name, value, type, error, helperText, placeholder, handleChange, onBlur, className } = props

  const Wrapper = styled(Box)(
    ({ }) => css`
        position: relative;
        input {
          width: calc(100% - 50px);
        } 
    `
  );

  return (
    <Wrapper>
      <input
        type={type ?? 'text'}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        // onBlur={handleBlur}
        value={value}
        className={`${className ? className : 'form-control'} ${error ? "is-invalid" : "is-valid"}`}
      />
      {error && <div className="valid-feedback">{helperText}</div>}
    </Wrapper>
  )
}

export default TextFieldAtom