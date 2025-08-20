import React, { useState } from 'react';
import './panel.css';
import './infoPanel.css'
import { Radio, MapPin, Zap, Signal, ChevronRight, ChevronLeft } from 'lucide-react';

function InfoPanel({ station, getSectorColor }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togglePanel = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Проверяем, что station существует
  if (!station) {
    return (
      <div className={`panel ${isCollapsed ? 'collapsed' : ''} panel-infoBS`}>
        <button className="toggle-btn" onClick={togglePanel}>
          {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        {!isCollapsed && (
          <div className="panel-content">
            <div style={{textAlign: "center", padding: "20px"}}>
              <p>Выберите станцию для просмотра информации</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`panel ${isCollapsed ? 'collapsed' : ''} panel-infoBS`}>
      {/* Кнопка переключения */}
      <button className="toggle-btn" onClick={togglePanel}>
        {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Содержимое панели */}
      {!isCollapsed && (
        <div className="panel-content">
          <h3 className="panel-title">Информация о БС</h3>
          
          <div className="point-container header-station">
            <Radio size={18} />
            <p className="station-name">{station.name} {station.type?.toUpperCase()}</p>
          </div>

          <div className="body-container">
            <div className="point-container">
              <MapPin size={16} />
              <div className="text-container">
                <p className="label">Адрес</p>
                <p className="value">{station.address}</p>
              </div>
            </div>

            <div className="point-container">
              <Zap size={16} />
              <div className="text-container">
                <p className="label">ID станции</p>
                <p className="value">{station.id}</p>
              </div>
            </div>
          </div>

          <div className="sectors-section">
            <div className="point-container sectors-header">
              <Signal size={16} />
              <h4 className="sectors-title">Секторы ({station.sectors?.length || 0})</h4>
            </div>
            
            <div className="sectors-list">
              {station.sectors?.map((sector) => (
                <div key={sector.id} className="sector-item">
                  <div className="sector-content">
                    <div 
                      className="sector-color-indicator"
                      style={{ backgroundColor: getSectorColor(sector.technology) }}
                    />
                    <div className="sector-info">
                      <p className="sector-name">Сектор {sector.id}</p>
                      <p className="sector-details">
                        {sector.azimuth}° | {sector.beamwidth}° | {sector.range}м
                      </p>
                      <span className="sector-technology">{sector.technology}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="point-container coordinates">
            <MapPin size={14} />
            <div className="coordinates-text">
              <span>Координаты: </span>
              <span className="coords-value">
                {station.lat?.toFixed(6)}, {station.lng?.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoPanel;