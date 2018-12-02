import React, { Component } from 'react';
import FilterLocation from './FilterLocation';
import ShowMap from './ShowMap';
import escapeRegExp from 'escape-string-regexp';

var foursquare = require('react-foursquare')({
  clientID: 'PF2PXHO1CXGHJE4ZTURAESVOF5DGBK14DF05CYRQURPLWT42',
  clientSecret: 'KQQTV2WASQX23QCDZQQRA4MSTNRJZGDZ1YEB3KMSOJAGOAAO'
});
//initial location details are provided
var params = {
  "ll": "32.576139,-117.014674"
};
//defaultMarkers positions are provided
var defaultMarkers = [
  {id: 1, name: 'Aquatica San Diego', location: {labeledLatLngs: [{
    lat: 32.587840, lng: -117.010753}], formattedAddress: ["2052 Entertainment Cir"]}, animation: null },
  {id: 2, name: 'Ocean View Hills Community Park', location: {labeledLatLngs: [{
    lat: 32.582299, lng: -117.026841}], formattedAddress: ["San Diego, CA 92154"]}, animation: null},
  {id: 3, name: 'North Island Credit Union Amphitheatre', location: {labeledLatLngs: [{
    lat: 32.587917, lng: -117.006351}], formattedAddress: ["2050 Entertainment Cir"]}, animation: null},
  {id: 4, name: 'Vista Pacifica Park', location: {labeledLatLngs: [{
    lat: 32.581037, lng: -117.005747}], formattedAddress: ["Avenida De Las Vistas"]}, animation: null},
  {id: 5, name: 'Walmart', location: {labeledLatLngs: [{
    lat: 32.581702, lng: -117.035608}], formattedAddress: ["710 Dennery Rd"]}, animation: null}
];

class App extends Component {
  state = {
    activeMarkers: defaultMarkers,
    query : '',
    allNearbyLocations: [],
    currentMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    markerClickedFromList: {},
    isListClicked: false,
    markerindex: 0,
    newActiveMarkers: []
  };
  //venue details are obtained using foursquare api
  componentDidMount() {
    foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ allNearbyLocations: res.response.venues });
      })
      .catch(error => {
        console.error('Error retrieving the venues from the foursquare site:', error);
      });
  }
  /**
   * update the markers on the page depending on the user query. filtering of the
   * locations is based on both defult markers and markers provided by foursquare.
   */
  updateMarkers(query){
    var defaultMarkersFiltered = defaultMarkers
    this.state.allNearbyLocations.map((location)=>(
      defaultMarkersFiltered = defaultMarkersFiltered.filter((defaultLocation)=>
        (location.name!==defaultLocation.name)
      ))
    )
    //get all the locations removing common location from default marker
    var newLocations = defaultMarkersFiltered.concat(this.state.allNearbyLocations)
    newLocations=this.setFormattedAddress(newLocations)
    if(query!=='') {
      this.findMarkers(query, newLocations)
    }
    else{
      this.setState({activeMarkers: newLocations})
    }
  }
  /**
   * set the formattedAddress[0] field of a location to " " if the location is undefined
   */
  setFormattedAddress(newLocations){
    newLocations.map((location)=> (
      (location===undefined) && (location.formattedAddress[0]= " ")
    ))
    return newLocations
  }
  /**
   * when user types a query, update the marker according to the query
   */
  getQuery = (query)=> {
    this.setState({query})
    this.updateMarkers(query);
  }
  /**
   * based on the query, filter out the matching markers on the page and store
   * them as active markers.
   */
  findMarkers = (query, newLocations)=>{
    const match = new RegExp(escapeRegExp(query), 'i')
    var showLocations = newLocations.filter((location) => match.test(location.name))
    this.setState({activeMarkers:showLocations})
  }
  /**
   * when map is clicked other than marker, then hide any infoWindow being shown
   */
  onMapClicked = (props) =>{
  if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        currentMarker: null
      })
    }
  };
  /**
   * when marker is clicked, show the infoWindow attaced to it
   */
  onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      currentMarker: marker,
      showingInfoWindow: true
    });
  }
  /**
   * when mouse is over marker, show the infoWindow attaced to it
   */
  onMouseoverMarker = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      currentMarker: marker,
      showingInfoWindow: true
    });
  }
  /**
   * when mouse comes out of the marker, hide the infoWindow attaced to it
   */
  onMouseOutMarker = (e) =>
      this.setState({
        showingInfoWindow: false,
        currentMarker: null
    });

 /**
 * onMarkerClickFromList is called when user clicks the sidebar. Store the marker
 * selected as markerClickedFromList and create a new set of markers so that active
 * markers sent to the showMap does not contain the clicked marker
 */
  onMarkerClickFromList = (marker, index) =>{
    this.setState({
      markerClickedFromList: marker,
      isListClicked: true,
      markerindex: index,
      newActiveMarkers: this.state.activeMarkers.filter((thisMarker)=>(
        thisMarker.id !== marker.id
      ))
    })
  }

  render() {
    return (
      <div className="App">
        <FilterLocation markers={this.state.activeMarkers} query={this.state.query}
        getQuery={this.getQuery} onMarkerClickFromList={this.onMarkerClickFromList}/>

        <ShowMap markers={this.state.activeMarkers} currentMarker={this.state.currentMarker}
        selectedPlace={this.state.selectedPlace} showingInfoWindow={this.state.showingInfoWindow}
        onMarkerClick={this.onMarkerClick} onMouseoverMarker={this.onMouseoverMarker}
        onMouseOutMarker={this.onMouseOutMarker} onMapClicked={this.onMapClicked}
        markerClickedFromList={this.state.markerClickedFromList}
        isListClicked={this.state.isListClicked} markerIndex={this.state.markerindex}
        newMarkers={this.state.newActiveMarkers}/>
      </div>
    );
  }
}

export default App;
