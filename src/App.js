import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {


  unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} = this.props;
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
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        })
      }
      else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth(); //closes the unsubscription. like the person logs out of the system. 
  }
  render() {
    return (
      <div>
        <Header />
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
const mapDispathToProps = dispatch =>({
  setCurrentUser: user =>dispatch(setCurrentUser(user))
})
export default connect(null,mapDispathToProps)(App);
