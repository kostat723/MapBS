import './Input.css'

function Input({
    children,
    type = 'text',
    placeholder = '',
    className = '',
    value,
    onChange,
    onKeyPress,
    ...props
}){
    return(
        <input 
          className={`input ${className}`}
          type={type} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          {...props}
        />
    )
}

export default Input