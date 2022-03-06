import { Component } from "react";
import { connect } from "react-redux";
import { Dimmer, Grid, Loader } from "semantic-ui-react";
import { auth, onAuthStateChanged } from "../Components/Firebaseconfig";
import { Globalstyle } from "../Components/Globalstyle/Globalstyle";
import { Clearuser, UserLogin } from "./action";
import Colorpanel from './Colorpanel/Colorpanel';
import Message from './Messages/Messages';
import Metapanel from './Metapanel/Metapanel';
import Sidepanel from './Sidepanel/Sidepanel';
import Headerpanel from "./Headerpanle/Headerpanel";
class App extends Component {

  componentDidMount = ()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
       this.props.UserLogin(user)
      } 
      else{
        this.props.Clearuser()
      }
    });
  }
  render(){
    return this.props.isLoading ? 
    <Dimmer active>
        <Loader>Loading</Loader>
    </Dimmer>
    :
    (
      <>
      <Globalstyle></Globalstyle>
      <Headerpanel  user = {this.props.userName.displayName}></Headerpanel>
        <Grid columns = "equal" style = {{marginTop: 0}}>
        <Grid.Column style = {{paddingBottom: 0,paddingRight: 0}} width = {1}>
              <Colorpanel></Colorpanel>
          </Grid.Column>
          <Grid.Column style = {{paddingBottom: 0,paddingLeft: 0}} width = {2}>
              <Sidepanel userGroup = {this.props.userName.displayName} user = {this.props.userName}></Sidepanel>
          </Grid.Column>
          <Grid.Column style = {{paddingBottom: 0}} width = {10}>
              <Message username = {this.props.userName} groupId = {this.props.groups}></Message>
          </Grid.Column>
          <Grid.Column style = {{paddingBottom: 0}} width = {3}>
              <Metapanel></Metapanel>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
const mapStateToProps = (getdata)=>({
  isLoading: getdata.user.isLoading,
  userName: getdata.user.currentUser,
  groups: getdata.groups.currentgroup
})
export default connect(mapStateToProps, {UserLogin,Clearuser})(App)

