import React from 'react';

interface IProps{
  name: string
  options: any
  optionsCheckeds: any
  onChecked: any
  keyName?:any
} 

const GroupCheckbox = ({ name, options, optionsCheckeds, onChecked, keyName }: IProps) => {
 
  
  return (
    <>
      {options.length > 0 &&
       options.map((item:any) => (
    <div key={item?.ID} className="form-check">
      <input
        type="checkbox"
        name={name}
        value={item.ID}
        checked={!!optionsCheckeds[item.ID]}
        onChange={onChecked}
        className="form-check-input"
        id={`${name}-${item.ID}`}
      />
      <label
        htmlFor={`${name}-${item.ID}`}
        className="form-check-label"
      >
        {keyName && item[keyName] || item.name}
      </label>
    </div>
        ))}
      </>
   );
};

export default GroupCheckbox;