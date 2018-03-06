import React, { Component } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Table, 
  Button, 
  ListGroup, 
  ListGroupItem, 
  Card,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
} from 'reactstrap';

import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';
import { BASE_URL } from '../../../constants/ServerUrl';

class ViewContact extends Component {
  state = {
    fetching: true,
    contact : {},
    confirmModal: false,
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
      this.setState({ fetching: false, contact: response.data });
    }) 
    .catch(function (error) {
      console.log(error);
    });    
  }

  handleUserDelete = (e) => {  
    this.setState({confirmModal: !this.state.confirmModal});   
    // console.log(this.state.contact);
    let path = BASE_URL + "/v1/b2b/deleteContact";
    let reqObject = {
      contact_id: this.state.contact._id,
    };    
    axios({      
      method: 'post',
      url: path,
      data: reqObject,      
    })
    .then(response => {
      console.log(response.data);
      let path = '/contacts';
      this.props.history.push(path);
    }) 
    .catch(function (error) {
      console.log(error);
    });  
  }  

  confirmToggle = () => {
    this.setState({confirmModal: !this.state.confirmModal });
  }

  render() {
    const contact = this.state.contact;

    return (
      <Container> 
        <Row>
          <Col md="8">
            <h3>{contact.first_name}</h3>  
          </Col>
          <Col md="4">
           <div style={{float: 'right'}}>
            <Link to='/contacts'>
              <Button color="secondary" size="sm">Back</Button>
            </Link>
            <Link to={'/contacts/edit/'+contact._id} style={{margin: '10px'}}>
              <Button outline color="primary" size="sm">Edit</Button>
            </Link>
            <Button outline color="danger" size="sm" onClick={this.confirmToggle} >Delete</Button>
            
            <Modal isOpen={this.state.confirmModal} toggle={this.confirmToggle} >
                <ModalHeader toggle={this.confirmToggle}>Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.handleUserDelete}>Ok</Button>{' '}
                    <Button color="secondary" onClick={this.confirmToggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

           </div>
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
               <ListGroup>
                <ListGroupItem>
                  First Name : {contact.first_name}
                </ListGroupItem>
                <ListGroupItem>
                  Middle Name: {contact.middle_name}
                </ListGroupItem>
                <ListGroupItem>
                  Last Name: {contact.last_name}
                </ListGroupItem>
                <ListGroupItem>
                  Phone: {contact.business_phone_no}
                </ListGroupItem>
                <ListGroupItem>
                  Email: {contact.official_e_mail_id}
                </ListGroupItem>
                <ListGroupItem>
                  Gender: {contact.gender}
                </ListGroupItem>
                <ListGroupItem>
                  Designation: {contact.designation}
                </ListGroupItem>  
                <ListGroupItem>
                  Job Level: {contact.job_level}
                </ListGroupItem>
                <ListGroupItem>
                  Job Function: {contact.job_function}
                </ListGroupItem>                             
              </ListGroup>

              <div style={{marginTop: '10px'}}>
                                           
              </div>

            </Card>
          }              
          </Col>
        </Row>       
      </Container>
    );
  }
}

export default withRouter(ViewContact);