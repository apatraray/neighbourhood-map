import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ShowMap extends Component {
  /**
   * bounce the marker when it is clicked on the map.
   */
  onMarkerClickShowMap = (props, marker, e) =>{
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
      }
      this.props.onMarkerClick(props, marker, e)
  }
  render() {
    const {google, markers, onMouseoverMarker,
      onMapClicked, currentMarker, selectedPlace, showingInfoWindow,
      markerClickedFromList, isListClicked, markerIndex, newMarkers} = this.props;
    // get the markers on the page based on the user clicked on sidebar or map
    var newActiveMarkers = isListClicked?newMarkers:markers
    return (
      <div className="map-container">
        <Map google={google} initialCenter={{
                  lat: 32.576139,
                  lng: -117.014674
                }}
          zoom={14}
          onClick={(props)=> onMapClicked(props)}
          >
          {  // get all the active markers on the page
            newActiveMarkers.map((mapLocation, index) => (
              <Marker key={index}
               id={mapLocation.id}
               name={mapLocation.name}
               draggable = {true}
               address={mapLocation.location.formattedAddress[0]}
               position={mapLocation.location.labeledLatLngs[0]}
               onClick={(props, mapLocation, e) => this.onMarkerClickShowMap(props, mapLocation, e)}
               onMouseover={(props, mapLocation, e) => onMouseoverMarker(props, mapLocation, e)}
               onMouseOut={(e)=> this.onMouseOutMarker(e)}
               animation = {isListClicked?null:this.props.google.maps.Animation.DROP}
              />
            ))
          }
          { //add the marker which user clicked
           (markerClickedFromList !== {}&&isListClicked===true)&&(
              <Marker key={markerIndex}
               id={markerClickedFromList.id}
               name={markerClickedFromList.name}
               draggable = {true}
               address={markerClickedFromList.location.formattedAddress[0]||[]}
               position={markerClickedFromList.location.labeledLatLngs[0]||{}}
               animation = {this.props.google.maps.Animation.BOUNCE}
              />
            )
          }
          <InfoWindow
            marker={currentMarker}
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
