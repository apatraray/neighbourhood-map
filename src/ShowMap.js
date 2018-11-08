import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
var previousMarker={}
class ShowMap extends Component {

/*  updateMap() {
        var map = new this.props.google.maps.Map(document.getElementById('root'), {
          zoom: 14,
          center: {lat: 32.576139,lng: -117.014674}
        });

        marker = new this.props.google.maps.Marker({
          map: map,
          draggable: true,
          animation: this.props.google.maps.Animation.DROP,
          position: this.props.selectedPlace
        });
        marker.addListener('click', this.toggleBounce);
      }

      toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
        }
      }
*/
  onMarkerClickShowMap = (props, marker, e) =>{
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
        }
        console.log("marker clicked", marker)
        console.log("marker clicked position", marker.getPosition())
        this.props.onMarkerClick(props, marker, e)
//        console.log("previousMarker clicked", previousMarker)
/*        if(previousMarker !=={}){
          previousMarker.setAnimation(null);
        }
        previousMarker = marker;*/
      }
/*
  toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    }
  }
*/
  onMouseoverMarker = (props, marker, e) =>{
  }

  render() {
    const {google, markers, onMarkerClick, onMouseoverMarker, onMouseOutMarker,
      onMapClicked, currentMarker, selectedPlace, showingInfoWindow} = this.props;
    console.log("markers", markers)
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
  //        onReady = {(props) => this.initMap(props)}
          onClick={(props)=> this.onMapClicked(props)}
          >
          {
            markers.map((mapLocation) => (
              <Marker key={mapLocation.id}
               name={mapLocation.name}
               animation = {google.maps.Animation.DROP}
               draggable = {true}
               address={mapLocation.location.formattedAddress[0]}
               lat= {mapLocation.location.labeledLatLngs[0].lat}
               lng= {mapLocation.location.labeledLatLngs[0].lng}
               position={mapLocation.location.labeledLatLngs[0]}
               onClick={(props, mapLocation, e) => this.onMarkerClickShowMap(props, mapLocation, e)}
               onMouseover={(props, mapLocation, e) => onMouseoverMarker(props, mapLocation, e)}
               onMouseOut={(e)=> this.onMouseOutMarker(e)}
              />
            ))
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
