import React, { Component } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Dimmer, Loader} from 'semantic-ui-react'
import { auth, onAuthStateChanged } from './Firebaseconfig';

export default class Privaterouter extends Component {
    state = {
        isLoggedin: false,
        isLoading: true
    }

    componentDidMount(){
        onAuthStateChanged(auth, (user) => {
            if (user) {
              this.setState({isLoggedin: true})
              this.setState({isLoading: false})
            } 
            else {
              this.setState({isLoggedin: false})
              this.setState({isLoading: false})
            }
          });
    }
    render() {
        if(this.state.isLoading){
            return <Dimmer active>
            <Loader indeterminate></Loader>
            </Dimmer>
        }
        return this.state.isLoggedin ? <Outlet/>  : <Navigate to = "/login"/> 
    }
}
