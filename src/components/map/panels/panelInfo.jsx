import React, { useState } from 'react';
import './panelInfo.css'
import { Radio, MapPin, Zap, Signal, ChevronRight, ChevronLeft } from 'lucide-react';
import Point from '../../ui/Point/Point';
import List from '../../ui/List/List';
import Panel from '../../ui/Panel/Panel';




function InfoPanel({ station, getSectorColor }) {
  function getBodyPanel(){
    return (
      <>
        <Point icon={<Radio size={18}/>} header="Наименование сайта">{station.name} {station.type?.toUpperCase()}</Point>
        <Point icon={<MapPin size={16} />} header="Адрес">{station.address}</Point>
        <Point icon={<Zap size={16} />} header="ID станции">{station.id}</Point>
        <Point icon={<MapPin size={14} />} header="Координаты: ">{station.lat?.toFixed(6)}, {station.lng?.toFixed(6)}</Point>
        <List icon={<Signal size={16} />} header={`Секторы (${station.sectors?.length || 0})`}>
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
        </List>
      </>      
    )
  }

  return (
    <Panel header='Информация о БС' text_closed='Выберите станцию для просмотра информации' className="info-panel">
        {!station ? (
            null
        ) : (
            getBodyPanel()
        )}

    </Panel>
  )

}

export default InfoPanel;