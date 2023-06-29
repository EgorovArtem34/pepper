import Select from 'react-select';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: 'none',
    borderRadius: '15px',
    padding: '4px 15px',
    backgroundColor: 'hsla(0, 4%, 82%, 0.197)',
  }),
};

const SelectMultipleForm = ({ ...props }) => (
  <Select
    noOptionsMessage={() => 'Нет доступных значений'}
    closeMenuOnSelect={false}
    isMulti
    styles={customStyles}
    {...props}
  />
);

export default SelectMultipleForm;
