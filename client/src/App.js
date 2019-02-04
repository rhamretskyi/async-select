import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import 'semantic-ui-css/semantic.min.css';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route 
                exec path="/users"
                component={Users}
              />
              <Route 
                exec path="/"
                component={Signup}
              />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
