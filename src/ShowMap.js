import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ShowMap extends Component {
  state = {
    currentMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      currentMarker: marker,
      showingInfoWindow: true
    });
  render() {
    const {google, markers} = this.props;

    return (
      <div className="map-container">
        <Map google={google} initialCenter={{
                  lat: 32.576139,
                  lng: -117.014674
                }}
          zoom={10}
          >
          {
            markers.map((mapLocation) => (
              <Marker key={mapLocation.id}
               name={mapLocation.title}
               position={mapLocation.location}
               onClick={this.onMarkerClick}
              />
            ))
          }
          <InfoWindow
          marker={this.state.currentMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              {this.state.selectedPlace.name}
            </div>
        </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBKB1JNeGT7tiLlNKdvSfnoXndV1UT8QIw")
})(ShowMap);
