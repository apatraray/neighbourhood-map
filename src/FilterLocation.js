import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

class FilterLocation extends Component {
  updateQuery = (query) => {
    debounce(300,
      this.props.getQuery(query))
  }

  render() {
    const {markers, query, onMarkerClickFromList} = this.props
    return (
      <div className='filter-location'>
        <div className='filter-location-top'>
        {(query !== '') && (
          <Link className="close-search" to="/">Close</Link>
        )}
          <div className="search-locations-input-wrapper">
            <input
              className='search-locations'
              type="text"
              placeholder="Search Location"
              value={query}
              onChange={(event)=> this.updateQuery(event.target.value)}
            />
          </div>
        </div>
      <ol className='marker-list'>
      {markers.map((marker, index) => (
        <li key={index} className='marker-list-item'>
          <div className='marker-details'
          onClick={() => onMarkerClickFromList(marker, index)}
          >
            {marker.name}
          </div>
        </li>
      ))}
      </ol>
    </div>

    );
  }
}

export default FilterLocation;
