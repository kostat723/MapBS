import { MapContainer, TileLayer, Marker, Popup, useMap,  } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
// import icon from "../Images/icon.png";
// import L from "leaflet";

export default function Map() {
  const latitude = 48.578924
  const longitude = 39.303449

//   const customIcon = new L.Icon({//creating a custom icon to use in Marker
//     iconUrl: icon,
//     iconSize: [25, 35],
//     iconAnchor: [5, 30]
//   });

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
     //Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={[latitude, longitude]}
      classsName="map"
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup><h1>OGO</h1><p>Это</p></Popup>
      </Marker>
      <MapView />
    </MapContainer>
  );
}