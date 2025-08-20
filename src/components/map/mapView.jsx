import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapView.css'
import PropTypes from 'prop-types';
import SearchPanel from './searchPanel';
import InfoPanel from './infoPanel';
import FilterPanel from './filterPanel'

// Исправляем иконки Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});


function Censorship(){
  return (
    <div style={{backgroundColor: 'black', position: 'absolute', bottom: '0', right: '0', height: '20px', width: '300px', zIndex: '2'}}></div>
  )
}


function Map ({ baseStations }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const layersRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchFinded, setSearchFinded] = useState('empty');
  // const [searchQuery, setSearchQuery] = useState('');
  const [stationHover, onStationHover] = useState('');



  // Инициализация карты
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [48.569336, 39.314759],
        zoom: 14,
        zoomControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 10
      }).addTo(mapInstance.current);

      layersRef.current = L.layerGroup().addTo(mapInstance.current);
      setIsLoaded(true);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Обновление базовых станций
  useEffect(() => {
    if (isLoaded && layersRef.current && baseStations.length > 0) {
      layersRef.current.clearLayers();

      baseStations.forEach((station) => {
        const stationIcon = L.divIcon({
          html: `
            <div style="
              background-color: ${getStationColor(station.type)};
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);              
            "></div>
          `,
          className: 'custom-station-icon',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const marker = L.marker([station.lat, station.lng], { 
          icon: stationIcon 
        }).addTo(layersRef.current);

        marker.bindPopup(() => {
          onStationHover(station);
          return (`
          <div style="color: #1f2937; font-family: system-ui;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${station.name}</h3>
            <p style="margin: 2px 0;"><strong>ID:</strong> ${station.id}</p>
            <p style="margin: 2px 0;"><strong>Адрес:</strong> ${station.address}</p>
            <p style="margin: 2px 0;"><strong>Тип:</strong> ${station.type}</p>
            <p style="margin: 2px 0;"><strong>Оператор(ы):</strong> ${station.operator || 'Не указан'}</p>
          </div>`
          )
        });

        station.sectors.forEach((sector) => {
          const sectorPath = createSectorPath(
            station.lat,
            station.lng,
            sector.azimuth,
            sector.beamwidth,
            sector.range
          );

          const sectorPolygon = L.polygon(sectorPath, {
            fillColor: getSectorColor(sector.technology),
            fillOpacity: 0.3,
            color: getSectorColor(sector.technology),
            weight: 2,
            opacity: 0.8,
          }).addTo(layersRef.current);

          sectorPolygon.bindPopup( () => {
            onStationHover(station);
            return (
              `<div style="color: #1f2937; font-family: system-ui;">
                <h4 style="margin: 0 0 8px 0; font-weight: bold;">Сектор ${sector.id}</h4>
                <p style="margin: 2px 0;"><strong>Технология:</strong> ${sector.technology}</p>
                <p style="margin: 2px 0;"><strong>Азимут:</strong> ${sector.azimuth}°</p>
                <p style="margin: 2px 0;"><strong>Ширина луча:</strong> ${sector.beamwidth}°</p>
                <p style="margin: 2px 0;"><strong>Дальность:</strong> ${sector.range}м</p>
                ${sector.power ? `<p style="margin: 2px 0;"><strong>Мощность:</strong> ${sector.power} дБм</p>` : ''}
              </div>`
            )
          });  

          sectorPolygon.on('mouseover', () => {
            // onStationHover(station);
            sectorPolygon.setStyle({ fillOpacity: 0.5 });
          });

          sectorPolygon.on('mouseout', () => {
            // onStationHover(null);
            sectorPolygon.setStyle({ fillOpacity: 0.3 });
          });
        });
      });
    }
  }, [baseStations, onStationHover, isLoaded]);


// Поиск
  function searchQueryStation(query) {
    console.log(query)
    if (query && mapInstance.current && baseStations.length > 0) {
      const foundStation = baseStations.find(
        (station) =>
          station.id.toLowerCase() == query.toLowerCase() ||
          station.address.toLowerCase().includes(query.toLowerCase()) ||
          station.name.toLowerCase() == query.toLowerCase()
      );

      if (foundStation) {
        mapInstance.current.setView([foundStation.lat, foundStation.lng], 16, {
          animate: true,
          duration: 1
        });
        onStationHover(foundStation);
        setSearchFinded('success');
      }
      else {
        setSearchFinded('error');
      }
    }
    else if (query == ''){
      setSearchFinded('empty');
      onStationHover('');
    }
  }

  return (
    <>
      <SearchPanel onSearch={searchQueryStation} findedBS={searchFinded}/>
      <InfoPanel station={stationHover} getSectorColor={getSectorColor}/>
      <FilterPanel />
      <Censorship />
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg shadow-elevated"
        style={{ height: '95vh', zIndex: 1, backgroundSize: 'cover'}}
      />
    </>
    
  );
};

// Вспомогательные функции
function getStationColor(type) {
  switch (type) {
    case 'macro': return '#8B5CF6';
    case 'micro': return '#3B82F6';
    case 'pico': return '#10B981';
    default: return '#6B7280';
  }
}

function getSectorColor(technology) {
  switch (technology) {
    case '2G': return '#22C55E';
    case '3G': return '#3B82F6';
    case '4G': return '#F59E0B';
    case '5G': return '#8B5CF6';
    default: return '#6B7280';
  }
}

function createSectorPath(lat, lng, azimuth, beamwidth, range) {
  const points = [[lat, lng]];
  const startAngle = azimuth - beamwidth / 2;
  const endAngle = azimuth + beamwidth / 2;
  
  for (let angle = startAngle; angle <= endAngle; angle += 5) {
    const rad = (angle * Math.PI) / 180;
    const deltaLat = (range / 111000) * Math.cos(rad);
    const deltaLng = (range / (111000 * Math.cos((lat * Math.PI) / 180))) * Math.sin(rad);
    points.push([lat + deltaLat, lng + deltaLng]);
  }
  
  points.push([lat, lng]);
  return points;
}

// PropTypes
Map.propTypes = {
  baseStations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['macro', 'micro', 'pico']).isRequired,
      operator: PropTypes.string,
      sectors: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          technology: PropTypes.oneOf(['2G', '3G', '4G', '5G']).isRequired,
          azimuth: PropTypes.number.isRequired,
          beamwidth: PropTypes.number.isRequired,
          range: PropTypes.number.isRequired,
          power: PropTypes.number,
        })
      ).isRequired,
    })
  ).isRequired,
  onStationHover: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Map;