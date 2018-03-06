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

class ViewAccount extends Component {
  state = {
    fetching: true,
    account : {},
    confirmModal: false,
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
      this.setState({ fetching: false, account: response.data });
    }) 
    .catch(function (error) {
      console.log(error);
    });    
  }

  handleUserDelete = (e) => {  
    this.setState({confirmModal: !this.state.confirmModal});  
    // console.log(this.state.account);
    let path = BASE_URL + "/v1/b2b/deleteAccount";
    let reqObject = {
        account_id: this.state.account._id,
    };
    axios({      
        method: 'post',
        url: path,
        data: reqObject,      
    })
    .then(response => {
        console.log(response.data);
        let path = '/accounts';
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
    const account = this.state.account;

    return (
      <Container> 
        <Row>
          <Col md="8">
            <h3>{account.company_name}</h3>  
          </Col>
          <Col md="4">
           <div style={{float: 'right'}}>
            <Link to='/accounts'>
              <Button color="secondary" size="sm">Back</Button>
            </Link>
            <Link to={'/accounts/edit/'+account._id} style={{margin: '10px'}}>
              <Button outline color="primary" size="sm">Edit</Button>
            </Link>
            <Button outline color="danger" size="sm" onClick={this.confirmToggle} >Delete</Button>
            
            <Modal isOpen={this.state.confirmModal} toggle={this.toggleConfirm} >
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
                  Name : {account.company_name}
                </ListGroupItem>
                <ListGroupItem>
                  Country: {account.country}
                </ListGroupItem>
                <ListGroupItem>
                  Website: {account.website}
                </ListGroupItem>
                <ListGroupItem>
                  Employees: {account.employees_range}
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

export default withRouter(ViewAccount);