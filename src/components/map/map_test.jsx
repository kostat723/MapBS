import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ data }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const layersRef = useRef({
    stations: L.layerGroup(),
    sectors: L.layerGroup(),
    markers: L.layerGroup()
  });
  const currentMarkers = useRef(new Map());
  const currentSectors = useRef(new Map());

  // Инициализация карты
  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);
      
      // Добавляем слои на карту
      Object.values(layersRef.current).forEach(layer => {
        layer.addTo(mapInstance.current);
      });
    }
  }, []);

  // Обновление маркеров
  const updateMarkers = (stations) => {
    const newMarkers = new Map();
    
    stations.forEach(station => {
      const markerId = `marker-${station.id}`;
      
      // Если маркер уже существует - обновляем его
      if (currentMarkers.current.has(markerId)) {
        const existingMarker = currentMarkers.current.get(markerId);
        existingMarker.setLatLng([station.lat, station.lng]);
        newMarkers.set(markerId, existingMarker);
      } else {
        // Создаем новый маркер
        const marker = L.marker([station.lat, station.lng])
          .bindPopup(station.name);
        layersRef.current.markers.addLayer(marker);
        newMarkers.set(markerId, marker);
      }
    });
    
    // Удаляем старые маркеры
    currentMarkers.current.forEach((marker, id) => {
      if (!newMarkers.has(id)) {
        layersRef.current.markers.removeLayer(marker);
      }
    });
    
    currentMarkers.current = newMarkers;
  };

  // Обновление секторов
  const updateSectors = (sectors) => {
    const newSectors = new Map();
    
    sectors.forEach(sector => {
      const sectorId = `sector-${sector.id}`;
      
      if (currentSectors.current.has(sectorId)) {
        // Обновляем существующий сектор
        const existingSector = currentSectors.current.get(sectorId);
        existingSector.setLatLngs(calculateSectorPath(sector));
      } else {
        // Создаем новый сектор
        const polygon = L.polygon(calculateSectorPath(sector), {
          color: getSectorColor(sector.technology)
        });
        layersRef.current.sectors.addLayer(polygon);
        newSectors.set(sectorId, polygon);
      }
    });
    
    // Удаляем старые секторы
    currentSectors.current.forEach((sector, id) => {
      if (!newSectors.has(id)) {
        layersRef.current.sectors.removeLayer(sector);
      }
    });
    
    currentSectors.current = newSectors;
  };

  // Обновление данных
  useEffect(() => {
    if (data) {
      updateMarkers(data.stations);
      updateSectors(data.sectors);
    }
  }, [data]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};