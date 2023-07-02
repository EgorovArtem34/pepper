import './button.scss';

type ButtonTypeVariant = 'button' | 'submit';

type ButtonType = {
  type: ButtonTypeVariant;
  className: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  type = 'button',
  className,
  disabled = false,
  onClick,
  children,
}: ButtonType) => (
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
