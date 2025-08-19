import React, { useState } from 'react';
import './infoPanel.css'
import { Radio, MapPin, Zap, Signal } from 'lucide-react';

function InfoPanel ({ station, getSectorColor }) {
  // Проверяем, что station существует
  if (!station) {
    return (
      <div className="infoBS" style={{textAlign: "center"}}>
        <p>Выберите станцию для просмотра информации</p>
      </div>
    );
  }


  return (
    <div className="infoBS">
      <h3>Информация о БС</h3>
      <div className="point-container">
        <Radio />
        <p >Название: {station.name} {station.type?.toUpperCase()}</p>
      </div>

      <div className="body-container">
        <div className="point-container">
          <MapPin />
          <div>
            <p>Адрес: </p>
            <p>{station.address}</p>
          </div>
        </div>

        <div className="point-container">
          <Zap  />
          <div>
            <p>ID станции: {station.id}</p>
          </div>
        </div>
      </div>

      <div className=''>
        <div className="point-container">
          <Signal />
          <h4 >Секторы ({station.sectors?.length || 0})</h4>
        </div>
        
        <div className="sectors-containers">
          {station.sectors.map((sector) => (
            <div
              key={sector.id}
              className=""
            >
              <div className="point-container sectors-container">
                <div
                  style={{ backgroundColor: getSectorColor(sector.technology) }}
                />
                <div>
                  <p>Сектор {sector.id}</p>
                  <p>
                    {sector.azimuth}° | {sector.beamwidth}° | {sector.range}м
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="point-container">
        <div className="">
          <span>Координаты: {station.lat.toFixed(6)}, {station.lng.toFixed(6)}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;