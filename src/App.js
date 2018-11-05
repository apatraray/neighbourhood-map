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
  {id: 1, name: 'Aquatica San Diego', location: {labeledLatLngs: [{
    lat: 32.587840, lng: -117.010753}], formattedAddress: ["2052 Entertainment Cir"]} },
  {id: 2, name: 'Ocean View Hills Community Park', location: {labeledLatLngs: [{
    lat: 32.582299, lng: -117.026841}], formattedAddress: ["San Diego, CA 92154"]}},
  {id: 3, name: 'North Island Credit Union Amphitheatre', location: {labeledLatLngs: [{
    lat: 32.587917, lng: -117.006351}], formattedAddress: ["2050 Entertainment Cir"]}},
  {id: 4, name: 'Vista Pacifica Park', location: {labeledLatLngs: [{
    lat: 32.581037, lng: -117.005747}], formattedAddress: ["Avenida De Las Vistas"]}},
  {id: 5, name: 'Walmart', location: {labeledLatLngs: [{
    lat: 32.581702, lng: -117.035608}], formattedAddress: ["710 Dennery Rd"]}}
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
    var defaultMarkersFiltered = defaultMarkers
    this.state.allNearbyLocations.map((location)=>(
      defaultMarkersFiltered = defaultMarkersFiltered.filter((defaultLocation)=>
        (location.name!==defaultLocation.name)
      ))
    )
    var newLocations = defaultMarkersFiltered.concat(this.state.allNearbyLocations)
    newLocations=this.setFormattedAddress(newLocations)
    if(query!=='') {
      this.findMarkers(query, newLocations)
    }
    else{
      this.setState({activeMarkers: newLocations})
    }
  }
  setFormattedAddress(newLocations){
    newLocations.map((location)=> (
      (location===undefined) && (location.formattedAddress[0]= " ")
    ))
    console.log(newLocations)
    return newLocations
  }
  getQuery = (query)=> {
    this.setState({query})
    this.updateMarkers(query);
  }
  findMarkers = (query, newLocations)=>{
    const match = new RegExp(escapeRegExp(query), 'i')
    var showLocations = newLocations.filter((location) => match.test(location.name))
    this.setState({activeMarkers:showLocations})
  }

  render() {
    console.log(this.state.allNearbyLocations)
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
