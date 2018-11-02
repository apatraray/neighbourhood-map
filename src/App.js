import React, { Component } from 'react';
import FilterLocation from './FilterLocation';
import ShowMap from './ShowMap';

class App extends Component {
  state = {
    markers: [
      {id: 1, title: 'Otay Vally Regional Park', location: {lat: 32.5886294, lng: -117.062309}},
      {id: 2, title: 'SeaWorld San Diego', location: {lat: 32.763903, lng: -117.229457}},
      {id: 3, title: 'Walmart Supercenter', location: {lat: 32.7416849, lng: -117.053625}},
      {id: 4, title: 'SDCCU Stadium', location: {lat: 32.7831122, lng: -117.1195716}},
      {id: 5, title: 'San Diego Zoo', location: {lat: 32.735316, lng: -117.149046}},
    ]
  };
  
  render() {
    return (
      <div className="App">
        <FilterLocation markers={this.state.markers}
        onUpdateSearchLocation={this.updateSearchLocation} />
        <ShowMap markers={this.state.markers} afterMapLoad={this.updateMarkerLocation}/>
      </div>
    );
  }
}

export default App;
