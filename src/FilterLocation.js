import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';

class FilterLocation extends Component {
  state={
    isHamBurgerIconOn: false,
    viewCount: 0
  }
  updateQuery = (query) => {
    debounce(300,
      this.props.getQuery(query))
  }
  /**
   * show the sidebar when user clicks the hamburger icon.
   */
  getHamBurgerIcon=()=> {
    this.setState({
      isHamBurgerIconOn: true,
      viewCount: 1
    })
  }
  /**
   * hide the sidebar when user clicks the hamburger icon.
   */
  getBackHamburgerIcon =()=>{
    this.setState({
      isHamBurgerIconOn: false
    })
  }
  render() {
    const {markers, query, getQuery, onMarkerClickFromList} = this.props
    const {isHamBurgerIconOn, viewCount} = this.state
    return (
      <div className='filter-container'>
      {(isHamBurgerIconOn === false) &&
        <div className="hamburger-icon-wrapper">
          <button className='hamburger-icon'
          aria-label='Expand to search places'
          onClick={()=> this.getHamBurgerIcon()}></button>
        </div>
      }
      {/*show the sidebar as default for the first time and then hide*/}
        {(isHamBurgerIconOn === true || viewCount===0) &&
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
              <button className='close-search'
              aria-label='cancel filter to search result'
              onClick={(event)=> getQuery('')}>Close</button>
            )}
            {(isHamBurgerIconOn === true) && (
              <button className='return-hamburger'
              aria-label='return to hamburger icon'
              onClick={()=> this.getBackHamburgerIcon()}>Back</button>
            )}
        </div>
        <ol className='marker-list'>
          {markers.map((marker, index) => (
            <li key={index} className='marker-list-item' role='treeitem' tabIndex={0}>
              <div className='marker-details'
              onClick={() => onMarkerClickFromList(marker, index)}
              >
              {marker.name}
              </div>
            </li>
          ))}
        </ol>
    </div>
  }
  </div>
    );
  }
}

export default FilterLocation;
