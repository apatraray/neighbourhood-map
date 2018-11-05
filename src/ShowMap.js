import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ShowMap extends Component {
  state = {
    currentMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markerContent: ''
  }
  onMapClicked = (props) =>{
  if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        currentMarker: null
      })
    }
  };
  onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      currentMarker: marker,
      showingInfoWindow: true
    });
    this.getMarkerContent();
  }
  onMouseoverMarker = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      currentMarker: marker,
      showingInfoWindow: true
    });
    this.getMarkerContent();
  }
    onMouseOutMarker = (e) =>
      this.setState({
        showingInfoWindow: false,
        currentMarker: null
    });

    getMarkerContent(){

    }
  render() {
    const {google, markers} = this.props;

    return (
      <div className="map-container">
        <Map google={google} initialCenter={{
                  lat: 32.576139,
                  lng: -117.014674
                }}
          zoom={14}
          onClick={this.onMapClicked}
          >
          {
            markers.map((mapLocation) => (
              <Marker key={mapLocation.id} className={'map-marker'}
               name={mapLocation.name}
               address={mapLocation.location.formattedAddress[0]}
               position={mapLocation.location.labeledLatLngs[0]}
               onClick={this.onMarkerClick}
               onMouseover={this.onMouseoverMarker}
               onMouseOut={this.onMouseOutMarker}
              />
            ))
          }
          <InfoWindow
          marker={this.state.currentMarker}
          onOpen={this.windowHasOpened}
          onClose={this.windowHasClosed}
          visible={this.state.showingInfoWindow}>
            <div className="infoWindow-container">
              <p>{this.state.selectedPlace.name}</p>
              <p>{this.state.selectedPlace.address}</p>
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
