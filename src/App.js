import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

function App() {
  return (
      <Switch>
        <Route exact path="/" component={ Homepage} />
        <Route exact path="/shop" component={ShopPage} />
        {/* <Route exact path='/shop/hats' component={ HatsPage } /> */}
      </Switch>
  );
}

export default App;
