import { Icon } from "leaflet";
import markerIcon from "leaflet/dist/images/placeholder-2x.png";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useAuth } from "../Context/AuthContext";

const ResultMap = () => {
  const { locationData: location } = useAuth();
  const [position, setPositon] = useState([23.731489, 90.245996]);

  useEffect(() => {
    if (location) {
      setPositon([location?.locationLat, location?.locationLng]);
    }
  }, [location]);
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
