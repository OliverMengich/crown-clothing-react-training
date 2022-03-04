import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/homepage.component';

const HatsPage = (props) =>{
  console.log(props);
  return(<div>
    <h1>Hats page</h1>
  </div>)
}

function App() {
  return (
      <Switch>
        <Route exact path="/" component={ Homepage} />
        <Route exact path='/shop/hats' component={ HatsPage } />
      </Switch>
  );
}

export default App;
