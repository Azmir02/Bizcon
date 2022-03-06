import React, { Component } from 'react'
import { Button, Form, Header, Icon, Modal,Message,Menu } from 'semantic-ui-react'
import { getDatabase, ref, set,onValue,onChildAdded,onDisconnect,onChildRemoved} from "../Firebaseconfig";
export default class Friends extends Component {
    state = {
        user: this.props.usernew,
        firends: []
    }
    componentDidMount(){
      if(this.state.user){
        this.userAddlisteners(this.state.user)
      }
    }

    userAddlisteners = (currentuser)=>{
        let newUser = []
        const db = getDatabase();
        const userRef = ref(db, 'users/');
        const connected = ref(db, '.info/connected');
        const presentUser = ref(db, 'present/' + currentuser.uid);
        const newpresent = ref(db, 'present/');

        onChildAdded(userRef,(snap)=>{
            let user = snap.val()
            user['uid'] = snap.key
            user ['status'] = 'offline'
            newUser.push(user)
            this.setState({firends: newUser})
        })
        onValue(connected,(snap)=>{
            if(snap.val() == true){
                set(presentUser , {
                    username: currentuser.displayName,
                    status: true
                })
                onDisconnect(presentUser).remove((error)=>{
                    if(error !== null){
                        console.log('vai logout hoy nai');
                    }
                })
            }
        })
        
        onChildAdded(newpresent,(snap)=>{
            this.newdatapresent(snap.key,true)
        })

        onChildRemoved(newpresent,(snap)=>{
            this.newdatapresent(snap.key,false)
        })
    }

    newdatapresent = (userInfo,activity)=>{
        let userAll = this.state.firends.reduce((initvalue,user)=>{

                if(user.uid == userInfo){
                    user['status'] = `${activity ? "Online" : "Offline"}`
                }
                initvalue.push(user)
                return initvalue

        },[])
        this.setState({firends: userAll})
    }

    render() {
        return (
            <>
             <Header as = "h4" textAlign = "center" style = {{color: "#989FAB"}}>
                 Friends({this.state.firends.length})
            <Icon name = "user" style = {{display: "inline-block", marginLeft: 50}}/></Header>

            {this.state.firends.map((firend)=>(
                <Menu.Item>{firend.username}--{firend.status}</Menu.Item>
            ))}
            </>
        )
    }
}
