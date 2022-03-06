import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';
import App from './Components/App';
import Login from './Components/Login/Login';
import rootReducer from './Components/reducer';
import Registration from './Components/Registration/Registration';
import Savelogin from './Components/Savelogin';
import Privaterouter from './Components/Privaterouter';

const store = createStore(rootReducer,composeWithDevTools())

class Routing extends Component{
  // state = {
  //   track: false
  // }
  // componentDidMount = ()=>{
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       this.setState({track: true})
  //     } 
  //     else {
  //       this.setState({track: false})
  //     }
  //   });
    
  // }
  

  render(){
    return(
      <Router>
        <Routes>
          <Route path = "/" element = {<Privaterouter/>}>
            <Route path = "/" element = {<App/>}></Route>
          </Route>
          <Route path = "/login" element = {<Savelogin/>}>
            <Route path = "/login" element = {<Login/>}></Route>
          </Route>
          <Route path = "/registration" element = {<Savelogin/>}>
            <Route path = "/registration" element = {<Registration/>}></Route>
          </Route>
        </Routes>
        {/* {this.state.track ? 
        <Routes>
          <Route path = "/" element = {<App/>}></Route>
          <Route path = "/registration" element = {<Navigate to = "/"/>}></Route>
          <Route path = "/login" element = {<Navigate to = "/"/>}></Route>
        </Routes>
      :
        <Routes>
          <Route path = "/" element = {<Navigate to = "/login"/>}></Route>
          <Route path = "/registration" element = {<Registration/>}></Route>
          <Route path = "/login" element = {<Login/>}></Route>
        </Routes>
        }  */}
    
      </Router>
    )
  }
}


ReactDOM.render(<Provider store = {store}><Routing /></Provider>,document.getElementById('root'));
