import { useState } from 'react';
import './Panel.css'
import { ChevronRight, ChevronLeft } from 'lucide-react';

function Panel({ 
    children,
    icon: Icon,
    header,
    className,
    text_closed = 'Нет информаци...'
 }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togglePanel = () => {
    setIsCollapsed(!isCollapsed);
  };


  return (
    <div className={`panel ${isCollapsed ? 'collapsed' : ''} ${className}`}>
        {/* Кнопка переключения */}
        <button className="toggle-btn" onClick={togglePanel}>
        {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Содержимое панели */}
        {!isCollapsed && (
            <div className="panel-content">
                {Icon}
                <h3 className="panel-title">{header}</h3>
                <div className="body-container">
                    {!children ? (
                        <div style={{textAlign: "center", padding: "20px"}}>
                            <p>{text_closed}</p>
                        </div>
                    ) : (
                        children
                    )}
                </div>    
            </div>           
        )}
    </div>
  );
}

export default Panel