import React, { Component } from 'react';
import SimpleSearchBar from './searchbar/container_simple_search_bar';
import AdvancedSearchBar from './searchbar/container_advanced_search_bar';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { advancedSearch: false  };
  }

  filter() {
    this.setState((prevState) => ({
      advancedSearch: !prevState.advancedSearch
    }));
  }

  render() {
    if(this.state.advancedSearch) {
      return (
        <AdvancedSearchBar onSimple={  this.filter.bind(this)  } onComplete={ this.filter.bind(this) } />
      );
    } else {
      return (
        <SimpleSearchBar onAdvanced={ this.filter.bind(this) } onComplete={ this.filter.bind(this) }/>
      );
    }
  }
}

export default SearchBar;
