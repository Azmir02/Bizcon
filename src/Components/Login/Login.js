import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Form, Icon, Input, Message } from 'semantic-ui-react'
import login from '../../login.png'
import { auth, signInWithEmailAndPassword} from '../Firebaseconfig'
import { Bottomlogin, ButtonGrp, Header, Loginbox, LoginImg } from './Loginstyle'
export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errormsg: '',
        successMsg: '',
        showPassword: "password"
    }
     //this is for show/hide password
     Showpass = ()=>{
        if(this.state.showPassword === "password"){
            this.setState({showPassword: "text"})
        }
        else{
            this.setState({showPassword: "password"})
        }
    }
    formvalidation = ({email,password})=>{
        if(!email.length || !password.length){
            this.setState({errormsg: "Please Login First"})
        }
        else if(password.length < 8 ){
            this.setState({errormsg: "Minimum 8 Characters Need For Strong Password"})
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
            signInWithEmailAndPassword(auth, this.state.email, this.state.password).then((userCredential) => {
                this.setState({email: ''})
                    this.setState({password: ''})
                    this.setState({errormsg: ""})
                    this.setState({successMsg: 'congratulations!'})
            })
            .catch((error) => {
                const errorMessage = error.message;
                if(errorMessage.includes("user")){
                    this.setState({errormsg: "User Not Found"})
                }
            });

        }
        
    }
    render() {
        const {email,password,errormsg,successMsg,showPassword} = this.state
        return (
            <>
                <Loginbox>
                    <LoginImg>
                        <img style = {{width: "15%"}} src={login} alt="" />
                    </LoginImg>
                    <Header as = "p" style = {{textAlign: "center",fontSize: "13px",marginBottom: "10px",marginTop: "20px"}}>Welcome To Bizcon</Header>
                    <Header as = "h4" style = {{textAlign: "center",marginTop: "0"}}>Login On Your Account</Header>
                    <Bottomlogin>
                    <Form onSubmit = {this.handleSubmit}>
                        <Header style = {{marginBottom: "8px", display: "block", color: "#42505D",fontWeight: "500",fontSize: "13px"}}><Icon name='envelope' />Email</Header>
                        <Form.Field className = {errormsg.includes("User") ? "error" : ""}>
                        <Input name = "email" value = {email} placeholder='Email Address' type = "email" onChange = {this.handleChange} />
                        </Form.Field>
                        <Header style = {{marginBottom: "8px", display: "block",color: "#42505D",fontWeight: "500",fontSize: "13px"}}><Icon name='lock' />Password</Header>
                        <Form.Field className = {errormsg.includes("Password") ? "error" : ""}>
                        <input type = {showPassword}  name = "password" value = {password} placeholder= "Password" style = {{position: "relative",paddingRight: 40}}onChange = {this.handleChange} /><Icon onClick = {this.Showpass} style = {{position: "absolute", top: "61%", right:15,color: "#42505D"}} name = "eye"/> 
                        </Form.Field>
                        <ButtonGrp>
                        <Button style = {{textAlign: "center",backgroundColor: "#42505D",color: "#fff"}} type='submit'>Submit</Button>
                        </ButtonGrp>
                    </Form>
                    <Header as = "p" style = {{fontSize: "14px",textAlign: "center",marginTop: "30px"}}>Don't Have An Account <NavLink to = "/registration">Sign Up</NavLink> </Header>
                    {errormsg ? <Message negative style = {{textAlign: "center",fontSize: "12px",fontWeight: "600"}}> <Icon name='exclamation triangle' />{errormsg}</Message> : ""}
                    {successMsg ? <Message positive style = {{textAlign: "center",fontSize: "14px",fontWeight: "600"}}><Icon name='check circle' />{successMsg}</Message> : ""}
                    </Bottomlogin>
                </Loginbox>
            </>
        )
    }
}
