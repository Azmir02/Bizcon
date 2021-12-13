import React, { Component } from 'react';
import { Dropdown, Grid, Header } from 'semantic-ui-react';
import { getAuth, signOut } from '../Firebaseconfig';

export default class Userpanel extends Component {
    option = ()=>[
        {
            text: <span>Logged as a {this.props.user}</span>,
            disabled: true
        } ,
        {
            text: <span>Change Profile Picture</span>
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
            <div>
                <Grid.Column>
                    <Header as = "h1" textAlign = "center" style = {{marginTop: "20px",color: "#fff"}}>
                        Bizcon
                    </Header>
                </Grid.Column>
                <Grid.Column style = {{textAlign: "center",marginTop: "50px"}}>
                    <Dropdown style = {{color: "#fff"}} trigger = {
                        <span>{this.props.user}</span>
                    } options = {this.option()}></Dropdown>    
                </Grid.Column>   
            </div>
        )
    }
}
