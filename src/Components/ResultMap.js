import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIcon from "../Images/Icons/marker.png";

const ResultMap = () => {
  let location = JSON.parse(sessionStorage.getItem("locationData"));

  const position = [
    location ? location.locationLat : 23.684994,
    location ? location.locationLng : 90.356331,
  ];

  return (
    <div className="map">
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={false}
        className="map__container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: markerIcon,
              iconSize: [32, 35],
              iconAnchor: [20, 35],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ResultMap;
