import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }
  unsubscribeFromAuth = null;
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      // this.setState({currentUser: user})

      // console.log(user)
      // await createUserProfileDocument(user);
      //call set state with the actual object itself
      if (userAuth) {
        const useRef = await createUserProfileDocument(userAuth);
        useRef.onSnapshot(snapShot=>{
          //get data related to the user stored in the database
          // use the .data to get properties of the data
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          },()=>{
            console.log(this.state)
          })
        });
        
      }
      else {
        this.setState({currentUser: userAuth});
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth(); //closes the unsubscription
  }
  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={ Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path='/signin' component={ SignInAndSignUp }/>
          {/* <Route exact path='/shop/hats' component={ HatsPage } /> */}
        </Switch>
      </div>
        
    );
  }
}

export default App;
