import styled from "styled-components";

const Registerbox = styled.div `
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
background-color: #f8f8f8;
width: 650px;
padding: 22px;
box-sizing: border-box;
box-shadow: -2px 0 14px rgba(0, 0, 0, 0.1)  ; 
	-webkit-box-shadow: -2px 0 14px rgba(0, 0, 0, 0.1)  ; 
	-moz-box-shadow: -2px 0 14px rgba(0, 0, 0, 0.1)  ; 

border-radius: 10px;
`

const FlexItem = styled.div `
display: flex;
justify-content: space-between;
align-items: center;
`
const Divsize = styled.div `
width: 50%;
`
const Header = styled.h1 `
font-family: 'Ubuntu', sans-serif;
font-size: 32px;
font-weight: 600;
color: #42505D;
margin-bottom: 20px;
`
export {
    Registerbox,
    FlexItem,
    Divsize,
    Header
};

