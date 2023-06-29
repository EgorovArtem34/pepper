import { ReactNode } from 'react';
import cn from 'classnames';
import './checkbox.scss';

interface CheckboxFormProps {
  isLabel: boolean;
  id: string;
  [key: string]: any;
  children?: ReactNode;
}

const Checkbox = (
  {
    isLabel,
    children,
    id,
    ...props
  }: CheckboxFormProps,
) => {
  const formClass = () => cn('form', 'form__checkbox', {
    'form__checkbox_with-label': isLabel,
  });
  return (
    <form className={formClass()}>
      {isLabel && (
        <label htmlFor={id} className="form__checkbox-label">
          {children}
        </label>
      )}
      <input {...props} id={id} type="checkbox" className="form__checkbox-input" />
    </form>
  );
};

Checkbox.defaultProps = {
  children: null,
};

export default Checkbox;
