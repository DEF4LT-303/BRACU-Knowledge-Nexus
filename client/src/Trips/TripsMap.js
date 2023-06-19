import React, { Component } from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";

const style = {
  width: "100%",
  height: "400px",
  position: "relative",
};

const triangleCoords = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
  { lat: 25.774, lng: -80.19 },
];

export class MapContainer extends Component {
  render() {
    return (
      <div style={{ height: "400px" }}>
        <Map
          google={this.props.google}
          containerStyle={style}
          className={"map"}
          zoom={14}
          onReady={this.fetchPlaces}
        >
          <Polygon
            paths={triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "",
})(MapContainer);
