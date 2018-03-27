import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container,
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
    <div className="top_navbar">
        <Container>
          <Navbar color="faded" light expand="md">
            <Link to="/">
              <div className="navbar-brand top_logo_name">
                Agentdesks Task
              </div>
            </Link>
          </Navbar>
        </Container>
    </div>              
      
    );
  }
}

export default NavBar;
