import React, { Component } from 'react';
import { 
    Container, 
    Row, 
    Col,      
    Card,
    Input,
} from 'reactstrap';


import { DUMP_DATA } from '../../constants/DumpData';

import Search from './Search';
import NameList from './NameList';

import InfiniteScroll from 'react-infinite-scroller';

const PER_PAGE = 50;

class Home extends Component {
  state = {
    fetching: true,
    data : [], 
    filterText: '', 
    hasMoreItems: true,  
    tracks: [],  
  };

  componentWillMount(){       
    this.setState({ data: DUMP_DATA, fetching: false });
  }  
  
  componentDidMount() {
    
  }

  filterUpdate = (value) => {   
    // console.log(value);     
    this.setState({filterText: value});
    if(value){
      this.setState({tracks: []});
    }
  }

  loadItems = (page) => {
    let data = this.state.data;
    let tracks = this.state.tracks;
    console.log(page);

    const start = (page -1) * PER_PAGE || 0;
    const end = start + PER_PAGE;    
    
    for (let i=start; i < end; i++ ){
      tracks.push(data[i]);      
    }
    if(page !== 80) {
      this.setState({
          tracks: tracks,
          hasMoreItems: true
      });
    } else {
        this.setState({
            hasMoreItems: false
        });
    }
            
  }
  
  render() {
    const data = this.state.tracks;
    const filterText = this.state.filterText;

     // filter logic
     let list = [];
     if (filterText) {          
      const tempList = JSON.parse(JSON.stringify(this.state.data));     
      list = tempList
      .filter( (thisItem, index) => {
        return thisItem.lastname.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;        
      });       
      
     } else { 
      list = JSON.parse(JSON.stringify(data));
     }

    const loader = <div className="loader">Loading ...</div>;

    
    return (
      <Container> 
        <Row>
          <Col md="2">             
          </Col>
          <Col md="8"> 
            <Search 
              filterText={this.state.filterText} 
              filterUpdate={this.filterUpdate}
            />                  
          </Col>
          <Col md="2">            
          </Col>          
        </Row>
        <Row>         
          <Col>
          <Card style={{marginTop: '10px'}}>
            { !filterText
                ? <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadItems}
                  hasMore={this.state.hasMoreItems}
                  loader={loader}
                  >
                  <NameList data={list} />   
                </InfiniteScroll>
                : <NameList data={list} /> 
            }   
            
            {/* <NameList data={List} filterText={this.state.filterText} /> */} 
            </Card>
          </Col>
        </Row>       
      </Container>
    );
  }
}

export default Home;