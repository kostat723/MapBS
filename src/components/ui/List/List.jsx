import './List.css'
import Point from '../Point/Point'
import Button from '../Button/Button'
import { useState } from 'react'
import { Radio, MapPin, Zap, Signal, ChevronUp, ChevronDown } from 'lucide-react';

function List({
    children,
    icon: Icon,
    header,
    arrayItems = [],
    className_list,
    className_item
}){
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const togglePanel = () => {
        setIsOpen(!isOpen)
        setIsCollapsed(!isCollapsed);
    };
    
    return (
        <div className='list-menu'>
            <div className='list-header'>
                <Point className='point-header' icon={Icon} header={header}/>
                <Button className='button-header' onClick={togglePanel} >
                    {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </Button>
            </div>
            
            {isOpen && (
                <div className={`list ${className_list}`}>
                    {arrayItems?.map((item) => (
                    <div key={sector.id} className={`item ${className_item}`}>
                        {item}
                    </div>
                    ))}
                    {children}
                </div>
            )}
        </div>        
    )
}

export default List