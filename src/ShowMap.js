import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ShowMap extends Component {
  render() {
    var locations = [
      {id: 1, title: 'Otay Vally Regional Park', location: {lat: 32.5886294, lng: -117.062309}},
      {id: 2, title: 'SeaWorld San Diego', location: {lat: 32.763903, lng: -117.229457}},
      {id: 3, title: 'Walmart Supercenter', location: {lat: 32.7416849, lng: -117.053625}},
      {id: 4, title: 'SDCCU Stadium', location: {lat: 32.7831122, lng: -117.1195716}},
      {id: 5, title: 'San Diego Zoo', location: {lat: 32.735316, lng: -117.149046}},
    ];
    return (
      <Map google={this.props.google} initialCenter={{
            lat: 32.576139,
            lng: -117.014674
          }} zoom={10}>
          {locations.map((mapLocation) => (
               <Marker
                 name={mapLocation.title}
                 position={mapLocation.location}
               />
             ))
           }

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBKB1JNeGT7tiLlNKdvSfnoXndV1UT8QIw")
})(ShowMap);
