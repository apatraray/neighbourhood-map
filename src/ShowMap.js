import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ShowMap extends Component {

  render() {
    const {google, markers, onMarkerClick, onMouseoverMarker, onMouseOutMarker,
      onMapClicked, currentMarker, selectedPlace, showingInfoWindow} = this.props;
    console.log("currentMarker", currentMarker)
    console.log("selectedPlace", selectedPlace)
    console.log("showingInfoWindow", showingInfoWindow)

    return (

      <div className="map-container">
        <Map google={google} initialCenter={{
                  lat: 32.576139,
                  lng: -117.014674
                }}
          zoom={14}
          animation={google.maps.Animation.BOUNCE}
          onClick={(props)=> onMapClicked(props)}
          >
          {
            markers.map((mapLocation) => (
              <Marker key={mapLocation.id}
               name={mapLocation.name}
               address={mapLocation.location.formattedAddress[0]}
               position={mapLocation.location.labeledLatLngs[0]}
               onClick={(props, mapLocation, e) => onMarkerClick(props, mapLocation, e)}
               onMouseover={(props, mapLocation, e) => onMouseoverMarker(props, mapLocation, e)}
               onMouseOut={(e)=> onMouseOutMarker(e)}
              />
            ))
          }
          <InfoWindow
          marker={currentMarker}
          onOpen={this.windowHasOpened}
          onClose={this.windowHasClosed}
          visible={showingInfoWindow}>
            <div className="infoWindow-container">
              <p>{selectedPlace.name}</p>
              <p>{selectedPlace.address}</p>
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
