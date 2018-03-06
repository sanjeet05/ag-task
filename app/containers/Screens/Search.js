import React, { Component } from 'react';
import { Input } from 'reactstrap';


class Search extends Component {
  state = {};

  filterUpdate = (e) => {    
    const value = e.target.value;
    this.props.filterUpdate(value);
    // console.log(value);
  }
    
  render() {    
    return (      
      <div>                   
        <Input 
          type="search" 
          name="search" 
          placeholder="Search by last name..." 
          ref={ (value) => this.searchValue = value }
          onChange={this.filterUpdate}
        />  
      </div>   
    );
  }
}

export default Search;