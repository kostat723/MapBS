import './panel.css'
import './filterPanel.css'
import { useState } from 'react'
import { Radio, MapPin, Zap, Signal, ChevronRight, ChevronLeft } from 'lucide-react';

function FilterPanel() {
    const [isPanelCollapsed, setIsCollapsed] = useState(false);
    const [showSectors, setShowSectors] = useState(false);
    const [filterStandard, setFilterStandard] = useState(["2G", "3G", "4G"]);


    const togglePanel = () => {
        setIsCollapsed(!isPanelCollapsed);
    };


    return (
        <div className={`panel ${isPanelCollapsed ? 'collapsed' : ''} panel-filterPanel`}>        
            {/* Кнопка переключения */}
            <button className="toggle-btn" onClick={togglePanel}>
                {isPanelCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* Содержимое панели */}
            {!isPanelCollapsed && (
                <div className="panel-content">
                <h3 className="panel-title">Настройка карты БС</h3>  
                <div className="body-container">
                    <div className='filter-standard'>

                    </div>
                    <div className='show-sectors'>

                    </div>
                    <div className='btn-set-settings'>
                        <button >Применить</button>
                    </div>
                </div>
                </div>
            )}
        </div>
    );

}

export default FilterPanel