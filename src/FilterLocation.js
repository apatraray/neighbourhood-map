import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FilterLocation extends Component {
  state = {
    query: '',
    searchedLocations : []
  }

  render() {
    const {query, searchedLocations} = this.state
    const {markers, onUpdateSearchLocation} = this.props

    return (
      <div className='filter-location'>
        <div className='filter-location-top'>
          <Link className="close-search" to="/">Close</Link>
          <div className="search-locations-input-wrapper">
            <input
              className='search-locations'
              type="text"
              placeholder="Search Place"
              value={query}
              onChange={(event)=> this.updateQuery(event.target.value)}
            />
          </div>
        </div>
      <ol className='marker-list'>
      {markers.map((marker) => (
        <li key={marker.id} className='marker-list-item'>
          <div className='marker-details'>
            {marker.title}
          </div>
        </li>
      ))}
      </ol>
    </div>

    );
  }
}

export default FilterLocation;
