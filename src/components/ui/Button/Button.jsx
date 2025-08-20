import './Button.css';

function Button ({ 
  children,
  icon: Icon, 
  onClick, 
  className = '',
  ...props 
}) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Button;