import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BaseStation } from '../types/baseStation';

// Исправляем иконки Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapProps {
  baseStations: BaseStation[];
  onStationHover: (station: BaseStation | null) => void;
  searchQuery: string;
}

const Map: React.FC<MapProps> = ({ 
  baseStations, 
  onStationHover, 
  searchQuery 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Инициализация карты
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Создаем карту
      mapInstance.current = L.map(mapRef.current, {
        center: [55.751244, 37.618423], // Москва
        zoom: 10,
        zoomControl: true
      });

      // Добавляем темный слой OpenStreetMap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(mapInstance.current);

      // Создаем группу слоев для базовых станций
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

  // Обновление базовых станций на карте
  useEffect(() => {
    if (isLoaded && layersRef.current && baseStations.length > 0) {
      // Очищаем предыдущие слои
      layersRef.current.clearLayers();

      baseStations.forEach((station) => {
        // Создаем иконку для базовой станции
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

        // Добавляем маркер станции
        const marker = L.marker([station.lat, station.lng], { 
          icon: stationIcon 
        }).addTo(layersRef.current!);

        // Всплывающая подсказка для станции
        marker.bindPopup(`
          <div style="color: #1f2937; font-family: system-ui;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${station.name}</h3>
            <p style="margin: 2px 0;"><strong>ID:</strong> ${station.id}</p>
            <p style="margin: 2px 0;"><strong>Адрес:</strong> ${station.address}</p>
            <p style="margin: 2px 0;"><strong>Тип:</strong> ${station.type}</p>
            <p style="margin: 2px 0;"><strong>Операторов:</strong> ${station.operator || 'Не указан'}</p>
          </div>
        `);

        // Добавляем секторы
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
          }).addTo(layersRef.current!);

          // Всплывающая подсказка для сектора
          sectorPolygon.bindPopup(`
            <div style="color: #1f2937; font-family: system-ui;">
              <h4 style="margin: 0 0 8px 0; font-weight: bold;">Сектор ${sector.id}</h4>
              <p style="margin: 2px 0;"><strong>Технология:</strong> ${sector.technology}</p>
              <p style="margin: 2px 0;"><strong>Азимут:</strong> ${sector.azimuth}°</p>
              <p style="margin: 2px 0;"><strong>Ширина луча:</strong> ${sector.beamwidth}°</p>
              <p style="margin: 2px 0;"><strong>Дальность:</strong> ${sector.range}м</p>
              ${sector.power ? `<p style="margin: 2px 0;"><strong>Мощность:</strong> ${sector.power} дБм</p>` : ''}
            </div>
          `);

          // Обработчики событий для наведения
          sectorPolygon.on('mouseover', () => {
            onStationHover(station);
            sectorPolygon.setStyle({ fillOpacity: 0.5 });
          });

          sectorPolygon.on('mouseout', () => {
            onStationHover(null);
            sectorPolygon.setStyle({ fillOpacity: 0.3 });
          });
        });
      });
    }
  }, [baseStations, onStationHover, isLoaded]);

  // Поиск по адресу или ID
  useEffect(() => {
    if (searchQuery && mapInstance.current && baseStations.length > 0) {
      const foundStation = baseStations.find(
        (station) =>
          station.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (foundStation) {
        mapInstance.current.setView([foundStation.lat, foundStation.lng], 14, {
          animate: true,
          duration: 1
        });
        onStationHover(foundStation);
      }
    }
  }, [searchQuery, baseStations, onStationHover]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg shadow-elevated"
      style={{ minHeight: '400px', zIndex: 1}}
    />
  );
};

// Вспомогательные функции
function getStationColor(type: string): string {
  switch (type) {
    case 'macro':
      return '#8B5CF6';
    case 'micro':
      return '#3B82F6';
    case 'pico':
      return '#10B981';
    default:
      return '#6B7280';
  }
}

function getSectorColor(technology: string): string {
  switch (technology) {
    case '2G':
      return '#22C55E';
    case '3G':
      return '#3B82F6';
    case '4G':
      return '#F59E0B';
    case '5G':
      return '#8B5CF6';
    default:
      return '#6B7280';
  }
}

function createSectorPath(
  lat: number,
  lng: number,
  azimuth: number,
  beamwidth: number,
  range: number
): [number, number][] {
  const points: [number, number][] = [[lat, lng]];
  const startAngle = azimuth - beamwidth / 2;
  const endAngle = azimuth + beamwidth / 2;
  
  // Создаем точки сектора
  for (let angle = startAngle; angle <= endAngle; angle += 5) {
    const rad = (angle * Math.PI) / 180;
    const deltaLat = (range / 111000) * Math.cos(rad);
    const deltaLng = (range / (111000 * Math.cos((lat * Math.PI) / 180))) * Math.sin(rad);
    
    points.push([lat + deltaLat, lng + deltaLng]);
  }
  
  points.push([lat, lng]);
  return points;
}

export default Map;