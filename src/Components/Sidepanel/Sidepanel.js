import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import Groups from './Groups'
import Friends from './Friends'
export default class Sidepanel extends Component {
    render() {
        return (
            <div>
               <Menu style = {{background: "#1F2937",width: "100%",paddingTop: 100, height: "100vh",borderRadius: 0}} vertical size = "large" >
                    <Groups groupuser = {this.props.userGroup}></Groups>
                    <Friends usernew = {this.props.user}></Friends>
               </Menu>
               
            </div>
        )
    }
}
