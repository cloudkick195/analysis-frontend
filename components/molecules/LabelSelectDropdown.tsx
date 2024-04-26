import SelectDropdown from './SelectDropdown';
interface IProps {
  className?:string
  name: string;
  label: string;
  value: any;
  handleChange: any;
  options: {
    val: string;
    name: string;
  }[];
}

const LabelSelectDropdown = ({
  className,
  name,
  label,
  value,
  handleChange,
  options,
}: IProps) => {
  return (
    <>
      <div className={className || "col-md-6 my-2 my-md-0"}>
      <div className="d-flex align-items-center">
        <label className="col-md-4 mr-3 mb-0 d-none d-md-block">{label}</label>
        <SelectDropdown
          name={name}
          value={value}
          handleChange={handleChange}
          options={options}
        />
      </div>
      </div>
    </>
  );
};

export default LabelSelectDropdown;
