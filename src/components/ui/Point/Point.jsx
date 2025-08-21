import './Point.css'

function Point({
    children,
    header,
    className,
    icon: Icon
}){
    return (
        <div className={`point-container ${className}`}>
            {Icon}
            <div className="container">
                <div className="header">{header}</div>
                <div className="children">{children}</div>
            </div>
        </div>
    )
}

export default Point