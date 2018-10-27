import React, { Component } from 'react';
import FilterLocation from './FilterLocation';
import ShowMap from './ShowMap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FilterLocation />
        <ShowMap />
      </div>
    );
  }
}

export default App;
