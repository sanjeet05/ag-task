import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Card, Form, FormGroup, Label, Input } from 'reactstrap';

import { Link } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from '../../../constants/ServerUrl';

import Pagination from "react-js-pagination";

const PER_PAGE = 30;
const TOTAL_COUNT = 450; // for demo only

class ListAccount extends Component {
  state = {
    fetching: true,
    accountList : [],
    activePage: 1,
    totalCount: 0,
    search: { company_name: '', }
  };

  
  componentDidMount(){
    let path = BASE_URL + "/v1/b2b/accountList";
    let headerObject = { 'page_number': 1 } ;
    let reqObject = {};
    axios({      
      method: 'post',
      url: path,
      data: reqObject, 
      headers: headerObject,     
    })
    .then(response => {      
      const totalCount = response.headers.total_count;
      this.setState({ fetching: false, accountList: response.data, totalCount: totalCount });
    }) 
    .catch(function (error) {
      console.log(error);
    });    
  }

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});

    let path = BASE_URL + "/v1/b2b/accountList";
    let headerObject = { 'page_number': pageNumber } ;

    let reqObject = {};
    axios({      
      method: 'post',
      url: path,
      data: reqObject, 
      headers: headerObject,     
    })
    .then(response => {            
      const totalCount = response.headers.total_count;
      this.setState({ fetching: false, accountList: response.data, totalCount: totalCount });
    }) 
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUserInput = (e) => {    
    const name = e.target.name;
    const value = e.target.value;
    let search = this.state.search;
    search[name] = value;
    this.setState({search});
  }


  handleUserSearch = (e) => {       
    let path = BASE_URL + "/v1/b2b/accountList";
    let headerObject = { 'page_number': 1 } ;
    let reqObject = {
      search: this.state.search,
    };
    axios({      
      method: 'post',
      url: path,
      data: reqObject, 
      headers: headerObject,     
    })
    .then(response => {      
      const totalCount = response.headers.total_count;
      this.setState({ fetching: false, accountList: response.data, totalCount: totalCount });
    }) 
    .catch(function (error) {
      console.log(error);
    });  
  } 

  render() {
    return (
      <Container> 
        <Row>
          <Col>
            <h3>Accounts</h3>  
          </Col>          
        </Row>

        <Row>
          <Col>
            <Form inline>
              <FormGroup className="mr-sm-2">                
                <Input 
                  type="text" 
                  name="company_name" 
                  id="company_name" 
                  placeholder="Search by name" 
                  onChange={this.handleUserInput}
                />
              </FormGroup>
              <div>
                <Button 
                  type="button" 
                  color="primary"
                  size="sm" 
                  style={{margin: '10px'}} 
                  onClick={this.handleUserSearch} 
                >
                Search
                </Button> 
              </div>
            </Form>
          </Col>          
        </Row>

        <Row>         
          <Col>
          {
            this.state.fetching 
            ? 
            <div>Loading...</div> 
            : 
            <Card>
              <Table hover>
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Name</th>
                    <th>Country</th>
                    <th>Website</th>
                    <th>Employees</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>                  
                  {
                    this.state.accountList.map( (thisItem, index) => {
                      return (
                        <tr key={thisItem._id}>
                          {/* <th scope="row">{index+1}</th> */}
                          <td>{thisItem.company_name}</td>
                          <td>{thisItem.country}</td>
                          <td>
                            <a href={'//'+thisItem.website} target="_blank" > {thisItem.website} </a>                          
                            {/* {thisItem.website} */}
                          </td>
                          <td>{thisItem.employees_range}</td> 
                          <td>
                            <Link to={'/accounts/'+thisItem._id}>
                              <Button outline color="primary" size="sm">View</Button>
                            </Link>                            
                          </td>                            
                        </tr>
                      );
                    })
                  }                  
                </tbody>  
              </Table> 

              <div style={{margin: '10px'}}>
                <Pagination
                  prevPageText='prev'
                  nextPageText='next'
                  firstPageText='first'
                  lastPageText='last'
                  activePage={this.state.activePage}
                  itemsCountPerPage={PER_PAGE}
                  totalItemsCount={this.state.totalCount}
                  pageRangeDisplayed={10}
                  onChange={this.handlePageChange.bind(this)}                  
                />
              </div>             
            </Card>           
          }                
          </Col>
        </Row>               
      </Container>
    );
  }
}

export default ListAccount;