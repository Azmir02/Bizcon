import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import Groups from './Groups'
import Userpanel from './Userpanel'
export default class Sidepanel extends Component {
    render() {
        return (
            <div>
               <Menu style = {{background: "#42505D",width: "300px"}} fixed = "left" vertical size = "large" >
                    <Userpanel user = {this.props.user}></Userpanel>
                    <Groups user = {this.props.user}></Groups>
               </Menu>
            </div>
        )
    }
}
