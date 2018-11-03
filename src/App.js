import React, { Component } from 'react';
import FilterLocation from './FilterLocation';
import ShowMap from './ShowMap';
import escapeRegExp from 'escape-string-regexp';

var foursquare = require('react-foursquare')({
  clientID: 'PF2PXHO1CXGHJE4ZTURAESVOF5DGBK14DF05CYRQURPLWT42',
  clientSecret: 'KQQTV2WASQX23QCDZQQRA4MSTNRJZGDZ1YEB3KMSOJAGOAAO'
});

var params = {
  "ll": "32.576139,-117.014674"
};
var defaultMarkers = [
  {id: 1, name: 'Otay Vally Regional Park', location: {lat: 32.5886294, lng: -117.062309}},
  {id: 2, name: 'SeaWorld San Diego', location: {lat: 32.763903, lng: -117.229457}},
  {id: 3, name: 'Walmart Supercenter', location: {lat: 32.7416849, lng: -117.053625}},
  {id: 4, name: 'SDCCU Stadium', location: {lat: 32.7831122, lng: -117.1195716}},
  {id: 5, name: 'San Diego Zoo', location: {lat: 32.735316, lng: -117.149046}},
];

class App extends Component {
  state = {
    activeMarkers: defaultMarkers,
    query : '',
    allNearbyLocations: []
  };

  componentDidMount() {
    foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ allNearbyLocations: res.response.venues });
      });
  }

  updateMarkers(query){
    if(query!=='') {
      this.findMarkers(query)
    }
    else{
      this.setState({activeMarkers: defaultMarkers})
    }
  }
  getQuery = (query)=> {
    this.setState({query})
    this.updateMarkers(query);
  }
  findMarkers = (query)=>{
    const match = new RegExp(escapeRegExp(query), 'i')
    var showLocations = this.state.allNearbyLocations.filter((location) => match.test(location.name))
    this.setState({activeMarkers:showLocations})
  }

  render() {
    return (
      <div className="App">
        <FilterLocation markers={this.state.activeMarkers} query={this.state.query}
        getQuery={this.getQuery}/>
        <ShowMap markers={this.state.activeMarkers} afterMapLoad={this.updateMarkerLocation}/>
      </div>
    );
  }
}

export default App;
