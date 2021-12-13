import styled from "styled-components"

const Loginbox = styled.div `
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
background-color: #f8f8f8;
width: 350px;
padding: 20px 32px;
box-sizing: border-box;
box-shadow: -2px 0 14px rgba(0, 0, 0, 0.1)  ; 
	-webkit-box-shadow: -2px 0 14px rgba(0, 0, 0, 0.1)  ; 
	-moz-box-shadow: -2px 0 14px rgba(0, 0, 0, 0.1)  ; 

border-radius: 10px;
`
const LoginImg = styled.div `
width: 100%;
display: flex;
justify-content: center;
`

const Bottomlogin = styled.div `
width: 100%;
margin-top: 30px;
`
const ButtonGrp = styled.div `
width: 100%;
display: flex;
justify-content: center;
`
const Header = styled.h1 `
font-family: 'Ubuntu', sans-serif;
font-size: 20px;
font-weight: 600;
color: #42505D;
`
export {
    Loginbox,
    LoginImg,
    Bottomlogin,
    ButtonGrp,
    Header
}

