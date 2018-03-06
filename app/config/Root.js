import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';

import App from '../containers/App';

// Screens
// for home
import Home from '../containers/Screens/Home';


const Root = () => {
  return (
    <Router>
      <Switch>                
        {/* MainLayout */}
        <App>
          {/* home */}
          <Route exact path="/" component={Home} />                 
        </App>
      </Switch>
    </Router>
  );
};

export default Root;

