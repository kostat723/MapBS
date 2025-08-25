import './checkBox.css'

function CheckBox ({ 
    label, 
    checked = false, 
    className,
    onChange 
}) {
  return (
    <label className={`checkbox ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: '16px', height: '16px' }}
      />
      {label}
    </label>
  );
};

export default CheckBox