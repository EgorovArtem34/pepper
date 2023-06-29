import React from 'react';
import './button.scss';

type ButtonType = 'button' | 'submit';

type ButtonProps = {
  type: ButtonType;
  className: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className,
  disabled = false,
  onClick,
  children,
}) => (
  <button
    type={type === 'button' ? 'button' : 'submit'}
    className={className}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  onClick: undefined,
};

export default Button;
