import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Form, FormGroup, Label, Input, FormText, Card, CardBody} from 'reactstrap';

import { Link } from 'react-router-dom';
import _ from 'lodash';

import axios from 'axios';
import { BASE_URL } from '../../../constants/ServerUrl';

class EditAccount extends Component {
  state = {
    fetching: true,
    account : {},
    user: {},
  };

  componentWillMount(){
    const account_id = this.props.match.params.account_id;
    this.setState({ account_id: account_id });
  }

  componentDidMount(){
    let path = BASE_URL + "/v1/b2b/getAccountById";
    let reqObject = {
      account_id: this.state.account_id,
    };
    axios({      
      method: 'post',
      url: path,
      data: reqObject,      
    })
    .then(response => {
      console.log(response.data);
      const user = _.cloneDeep(response.data);
      this.setState({ fetching: false, account: response.data, user: user });
    }) 
    .catch(function (error) {
      console.log(error);
    });    
  }

  handleUserInput = (e) => {    
    const name = e.target.name;
    const value = e.target.value;
    let account = this.state.account;
    account[name] = value;
    this.setState({account});
  }

  handleUserUpdate = (e) => {    
    // console.log(this.state.account);
    let path = BASE_URL + "/v1/b2b/updateAccount";
    let reqObject = {
      account: this.state.account,
    };
    axios({      
      method: 'post',
      url: path,
      data: reqObject,      
    })
    .then(response => {
      console.log(response.data);
      let path = '/accounts/'+ response.data._id;
      this.props.history.push(path);
    }) 
    .catch(function (error) {
      console.log(error);
    });
  }  


  render() {
    const account = this.state.account;

    return (
      <Container> 
        <Row>
          <Col>
            <h3>Edit: <span className="text-muted">{this.state.user.company_name}</span> </h3>  
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
              <CardBody> 
                <Form>
                  <FormGroup>
                    <Label for="company_name">Name</Label>
                    <Input 
                      type="text" 
                      name="company_name" 
                      id="company_name" 
                      placeholder="Name"
                      defaultValue={account.company_name}
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="country">Country</Label>
                    <Input 
                      type="text" 
                      name="country" 
                      id="country" 
                      placeholder="Country" 
                      defaultValue={account.country} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="website">Website</Label>
                    <Input 
                      type="text" 
                      name="website" 
                      id="website" 
                      placeholder="Website" 
                      defaultValue={account.website} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="employees_range">Employees</Label>
                    <Input 
                      type="text" 
                      name="employees_range" 
                      id="employees_range" 
                      placeholder="Employees" 
                      defaultValue={account.employees_range} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup> 
                  
                  <Button type="button" color="primary" size="sm" style={{margin: '10px'}} onClick={this.handleUserUpdate} >Update</Button> 
                  <Link to={'/accounts/'+account._id}>
                    <Button outline color="secondary" size="sm">Cancel</Button>
                  </Link>
                </Form> 
              </CardBody>     
            </Card>
          }              
          </Col>
        </Row>       
      </Container>
    );
  }
}

export default EditAccount;