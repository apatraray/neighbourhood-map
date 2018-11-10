import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';

class FilterLocation extends Component {
  updateQuery = (query) => {
    debounce(300,
      this.props.getQuery(query))
  }

  render() {
    const {markers, query, getQuery, onMarkerClickFromList} = this.props
    return (
      <div className='filter-location'>
          <div className="search-locations-input-wrapper">
            <input
              className='search-locations'
              type="text"
              name="search"
              aria-label="Search"
              placeholder="Search Location"
              aria-required="false"
              value={query}
              onChange={(event)=> this.updateQuery(event.target.value)}
            />
            {(query !== '') && (
              <button role='button' className='close-search'
              aria-label='cancel filter to search result'
              onClick={(event)=> getQuery('')}>Close</button>
            )}
          </div>
      <ol className='marker-list'>
      {markers.map((marker, index) => (
        <li key={index} className='marker-list-item' role='treeitem' tabindex='0'>
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
