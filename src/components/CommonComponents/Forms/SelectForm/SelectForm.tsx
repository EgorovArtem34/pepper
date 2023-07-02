import { ReactNode } from 'react';
import * as _ from 'lodash';
import style from './style.module.scss';

interface SelectFormProps {
  children: ReactNode;
  [key: string]: any;
  options: string[] | number[];
  place: string;
  makeOptions: (() => ReactNode) | null;
}

const SelectForm = ({
  children, makeOptions, options, place, ...props
}: SelectFormProps) => (
  <form className="filters__form">
    <label htmlFor="filter-username" className="select-label">
      {children}
      <select {...props} className={`${style.select} ${style[place]}`}>
        {makeOptions
          ? makeOptions()
          : options.map((option) => (
            <option key={_.uniqueId()} value={option} className="select__option">
              {option}
            </option>
          ))}
      </select>
    </label>
  </form>
);

export default SelectForm;
