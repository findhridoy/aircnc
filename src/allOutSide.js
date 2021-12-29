import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";

function ResultMap(props) {
  const containerStyle = {
    // width: "calc(50% + 60px)",
    width: "50%",
    height: "100%",
  };

  return (
    <div className="map">
      <Map
        style={containerStyle}
        google={props.google}
        initialCenter={{ lat: props.lat, lng: props.lng }}
        zoom={10}
      >
        <Marker name={"Current location"} />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB2_5C3vlNmcCzKEAlVEPlq9Pv4Febi0b8",
})(ResultMap);
