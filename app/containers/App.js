import React from 'react';
import NavBar from './NavBar/NavBar';

import { Container } from 'reactstrap';

const App = (props) => {
  return (
    <div>
      <Container>
        <NavBar />
        <div style={{marginLeft: '20px'}}>
          {
            (() => {
              return (
                props.children
              );
            }) ()
          }
        </div>
      </Container>
    </div>
  );
};

export default App;
