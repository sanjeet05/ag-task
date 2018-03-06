import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Form, FormGroup, Label, Input, FormText, Card, CardBody} from 'reactstrap';

import { Link } from 'react-router-dom';
import _ from 'lodash';

import axios from 'axios';
import { BASE_URL } from '../../../constants/ServerUrl';

class EditContact extends Component {
  state = {
    fetching: true,
    contact : {},
    user: {},
  };

  componentWillMount(){
    const contact_id = this.props.match.params.contact_id;
    this.setState({ contact_id: contact_id });
  }

  componentDidMount(){
    let path = BASE_URL + "/v1/b2b/getContactById";
    let reqObject = {
      contact_id: this.state.contact_id,
    };
    axios({      
      method: 'post',
      url: path,
      data: reqObject,      
    })
    .then(response => {
      console.log(response.data);
      const user = _.cloneDeep(response.data);
      this.setState({ fetching: false, contact: response.data, user: user });
    }) 
    .catch(function (error) {
      console.log(error);
    });    
  }

  handleUserInput = (e) => {    
    const name = e.target.name;
    const value = e.target.value;
    let contact = this.state.contact;
    contact[name] = value;
    this.setState({contact});
  }

  handleUserUpdate = (e) => {    
    // console.log(this.state.contact);
    let path = BASE_URL + "/v1/b2b/updateContact";
    let reqObject = {
      contact: this.state.contact,
    };
    axios({      
      method: 'post',
      url: path,
      data: reqObject,      
    })
    .then(response => {
      console.log(response.data);
      let path = '/contacts/'+ response.data._id;
      this.props.history.push(path);
    }) 
    .catch(function (error) {
      console.log(error);
    });
  }  


  render() {
    const contact = this.state.contact;
    
    return (
      <Container> 
        <Row>
          <Col>
            <h3>Edit: <span className="text-muted">{this.state.user.first_name}</span> </h3>  
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
                    <Label for="first_name">First Name</Label>
                    <Input 
                      type="text" 
                      name="first_name" 
                      id="first_name" 
                      placeholder="First Name"
                      defaultValue={contact.first_name}
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="middle_name">Middle Name</Label>
                    <Input 
                      type="text" 
                      name="middle_name" 
                      id="middle_name" 
                      placeholder="Middle Name" 
                      defaultValue={contact.middle_name} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input 
                      type="text" 
                      name="last_name" 
                      id="last_name" 
                      placeholder="Last Name" 
                      defaultValue={contact.last_name} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="business_phone_no">Phone</Label>
                    <Input 
                      type="text" 
                      name="business_phone_no" 
                      id="business_phone_no" 
                      placeholder="Phone number" 
                      defaultValue={contact.business_phone_no} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup> 
                  <FormGroup>
                    <Label for="official_e_mail_id">Email</Label>
                    <Input 
                      type="text" 
                      name="official_e_mail_id" 
                      id="official_e_mail_id" 
                      placeholder="Email" 
                      defaultValue={contact.official_e_mail_id} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input 
                      type="text" 
                      name="gender" 
                      id="gender" 
                      placeholder="Gender" 
                      defaultValue={contact.gender} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="designation">Designation</Label>
                    <Input 
                      type="text" 
                      name="designation" 
                      id="designation" 
                      placeholder="Designation" 
                      defaultValue={contact.designation} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="job_level">Job Level</Label>
                    <Input 
                      type="text" 
                      name="job_level" 
                      id="job_level" 
                      placeholder="Job Level" 
                      defaultValue={contact.job_level} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="job_function">Job Function</Label>
                    <Input 
                      type="text" 
                      name="job_function" 
                      id="job_function" 
                      placeholder="Job Function" 
                      defaultValue={contact.job_function} 
                      onChange={this.handleUserInput}
                    />
                  </FormGroup>
                  
                  <Button type="button" color="primary" size="sm" style={{margin: '10px'}} onClick={this.handleUserUpdate} >Update</Button> 
                  <Link to={'/contacts/'+contact._id}>
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

export default EditContact;