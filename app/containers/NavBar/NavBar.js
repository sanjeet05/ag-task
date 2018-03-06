import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,   
    
} from 'reactstrap';


class NavBar extends Component {

  state = { };


  render() {    
    return (
        <div>
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/" style={{color: '#F37623', fontWeight: '700'}}>Agentdesks Task</NavbarBrand>                            
            </Navbar>         
        </div>        
      
    );
  }
}

export default NavBar;
