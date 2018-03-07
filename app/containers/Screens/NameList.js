import React, { Component } from 'react';
import { Table } from 'reactstrap';

class NameList extends Component {
  state = { };
 
  render() {
    const { data } = this.props;


    // filter logic
    const List = data
    // .filter( (thisItem, index) => {
    //   return thisItem.lastname.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;        
    // })
    .map( (thisItem, index) => {
      const lastname = thisItem.lastname === 'NULL' ? '' : thisItem.lastname;
      const firstname = thisItem.firstname === 'NULL' ? '' : thisItem.firstname;
      const agency_name = thisItem.agency_name === 'NULL' ? '' : thisItem.agency_name;
      return (
        <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{firstname +' '+ lastname } </td>
          <td>{thisItem.email}</td>
          <td>{agency_name}</td>                                                      
        </tr>
      );
    });

    return (      
      <div>     
      
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Agency Name</th> 
            </tr>
          </thead>
          <tbody>
            {
              data.length !==0
              ? List
              : <div style={{margin: '10px'}}> Result not found... </div>
            }
          </tbody>  
        </Table>                          
      </div>  
     
    );
  }
}

export default NameList;