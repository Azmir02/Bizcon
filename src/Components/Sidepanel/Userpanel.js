import React, { Component } from 'react';
import { Dropdown, Grid} from 'semantic-ui-react';
import { getAuth, signOut} from '../Firebaseconfig';

export default class Userpanel extends Component {
    option = ()=>[
        {
            text: <span>Logged as a {this.props.user}</span>,
            disabled: true
        } ,
        {
            text: <span onClick = {this.open}>Change Profile Picture</span>
        } , 
        {
            text: <span onClick = {this.logOut}>Log Out</span>
        } 
    ]

    logOut = ()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
        //Sign Out
        }).catch((error) => {
        // An error happened.
        });
    }
    render() {
        return (
            <>
                <Grid.Column style = {{textAlign: "center",margin: "7px 0px"}}>
                    <Dropdown style = {{color: "#4C515C",fontWeight: "bold",fontSize: "16px"}} trigger = {
                        <span>{this.props.user}</span>
                    } options = {this.option()}></Dropdown>    
                </Grid.Column> 
            </>
        )
    }
}