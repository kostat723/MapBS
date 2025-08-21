import './Button.css';

function Button ({ 
  children,
  icon: Icon, 
  type,
  onClick, 
  className = '',
  ...props 
}) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;