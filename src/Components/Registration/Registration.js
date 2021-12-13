import React, { Component } from 'react'
import { NavLink ,Navigate} from 'react-router-dom'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import Regimg from '../../Registrations.png'
import { auth, createUserWithEmailAndPassword, getDatabase, ref, set, updateProfile } from '../Firebaseconfig'
import { Divsize, FlexItem, Header, Registerbox } from './Registrationstyle'
export default class Registration extends Component {
    state = {
        userName: '',
        email: '',
        password: '',
        confirmPass: '',
        errormsg: '',
        successMsg: '',
        load: false,
    }

    //this is for form validation
    formvalidation = ({userName,email,password,confirmPass})=>{
        if(!userName.length || !email.length || !password.length || !confirmPass.length){
            this.setState({errormsg: "Please Register First"})
        }
        else if(password.length < 8 || confirmPass.length < 8 ){
            this.setState({errormsg: "Minimum 8 Characters Need For Strong Password"})
        }
        else if(password != confirmPass){
            this.setState({errormsg: "Opps! Password Doesn't Match"})
        }
        else{
            return true
        }
    }
    //this is for target handlechange
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        if(this.formvalidation(this.state)){
            this.setState({load: true})
            createUserWithEmailAndPassword(auth, this.state.email, this.state.password).then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: this.state.userName
                  }).then(()=>{
                      this.writeUserData(userCredential)
                      window.location.href = "/login"
                  }).then(() => {
                    this.setState({userName: ''})
                    this.setState({email: ''})
                    this.setState({password: ''})
                    this.setState({confirmPass: ''})
                    this.setState({errormsg: ""})
                    this.setState({successMsg: 'congratulations!'})
                    this.setState({load: false})
                  }).catch((error) => {
                    this.setState({load: false})
                    const errorCode = error.code;
                    if(errorCode.includes("name")){
                        this.setState({errormsg: "Please Enter Valid Name"})
                    }
                  
                  });
            })
            .catch((error) => {
                this.setState({load: false})
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode.includes("email")){
                    this.setState({errormsg: "Email already have been usage"})
                }
            });

        }
        
    }
    //This is RealTime Database
    writeUserData = (user)=> {
        const db = getDatabase();
        set(ref(db, 'users/' + user.user.uid), {
            username: this.state.userName
        });
      }
    render() {
        //This is for value
        const {userName,email,password,confirmPass,errormsg,successMsg,load} = this.state
        return (
            <>
                <Registerbox>
                    <FlexItem>
                    <img style = {{width: "50%"}} src={Regimg} alt="" />
                    <Divsize style = {{textAlign: "center"}}>
                    <Header>Register First</Header>
                    <Form onSubmit = {this.handleSubmit}>
                        <Form.Field>
                        <input name = "userName" value = {userName} placeholder='Username' type="text" onChange = {this.handleChange} />
                        </Form.Field>
                        <Form.Field className = {errormsg.includes("Email") ? "error" : ""}>
                        <input name = "email" value = {email} placeholder='Email Address' type = "email" onChange = {this.handleChange} />
                        </Form.Field>
                        <Form.Field className = {errormsg.includes("Password") ? "error" : ""}>
                        <input type = "password"  name = "password" value = {password} placeholder= "Password" onChange = {this.handleChange} />
                        </Form.Field>
                        <Form.Field className = {errormsg.includes("Password") ? "error" : ""}>
                        <input  name = "confirmPass" value = {confirmPass} placeholder='Confirm Password' type = "password" onChange = {this.handleChange} />
                        </Form.Field>
                        <Button className = {load ? "loading primary disabled" : ""}  type = "submit" style = {{width: "50%",backgroundColor: "#42505D",color: "#fff"}} type='submit'>Submit</Button>
                    </Form>
                    </Divsize>
                    </FlexItem>
                    <Header as = "p" style = {{fontSize: "16px",textAlign: "center",marginTop: "20px"}}>Already Have An Account <NavLink to = "/login">Log in</NavLink> </Header>
                    {errormsg ? <Message negative style = {{textAlign: "center",fontSize: "14px",fontWeight: "600"}}> <Icon name='exclamation triangle' />{errormsg}</Message> : ""}
                    {successMsg ? <Message positive style = {{textAlign: "center",fontSize: "14px",fontWeight: "600"}}><Icon name='check circle' />{successMsg}</Message> : ""}
                </Registerbox>
            </>
        )
    }
}
