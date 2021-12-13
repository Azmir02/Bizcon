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
        <Grid columns = "equal">
          <Grid.Column width = {3}>
              <Sidepanel user = {this.props.userName.displayName}></Sidepanel>
          </Grid.Column>
          <Grid.Column width = {4}>
              <Colorpanel></Colorpanel>
          </Grid.Column>
          <Grid.Column width = {4}>
              <Message></Message>
          </Grid.Column>
          <Grid.Column width = {4}>
              <Metapanel></Metapanel>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
const mapStateToProps = (getdata)=>({
  isLoading: getdata.user.isLoading,
  userName: getdata.user.currentUser
})
export default connect(mapStateToProps, {UserLogin,Clearuser})(App)
// export default App;

