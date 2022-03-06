import React, { Component } from 'react'
import { Grid, Segment,Header,Button,Comment,Icon,Image,Progress} from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { getDatabase, ref, push, set,child,onChildAdded,onChildChanged } from "../Firebaseconfig";
import moment from 'moment';
import Images from './Images';
import { connect } from 'react-redux';
import {progrecess} from '../action'
import { onValue, remove } from 'firebase/database';


class Messages extends Component {
    state = {
        messages: '',
        groupsItem: [],
        modal: false,
        files: [],
        userCount: [],
        senduserfile:[],
        typing: false,
        isTyping: [],
        searchTopic: '',
        searchload: false,
        filerSearching: []
    }
    
    open = ()=>{
        this.setState({modal: true})
    }
    close = ()=>{
        this.setState({modal: false})
    }


    componentDidUpdate(previousProps){
        let messageArea = []
        let totaluser = []
        const groupsRef = ref(getDatabase(), 'Message/');
        onChildAdded(groupsRef, (data) => {
          data.forEach((item)=>{
              messageArea.push(item.val())
              if(totaluser.indexOf(item.val().Sender) == -1 && this.props.groupId.id == item.val().Group){
                    totaluser.push(item.val().Sender)
              }
              
              if(previousProps.groupId){
                if(previousProps.groupId.groupName !== this.props.groupId.groupName){
                    this.setState({groupsItem:messageArea})
                    this.setState({userCount: totaluser})
                }
                }else{
                    this.setState({groupsItem:messageArea})
                    this.setState({userCount: totaluser})
                }
          })
        });
        
        onChildChanged(groupsRef, (data) => {
            messageArea = []
            totaluser = []
          data.forEach((item)=>{
              messageArea.push(item.val())
              if(totaluser.indexOf(item.val().Sender) == -1  && this.props.groupId.id == item.val().Group){
                    totaluser.push(item.val().Sender)
              }
              if(previousProps.groupId){
                if(previousProps.groupId.groupName !== this.props.groupId.groupName){
                    this.setState({groupsItem:messageArea})
                    this.setState({userCount: totaluser})
                }
            }else{
                this.setState({groupsItem:messageArea})
                this.setState({userCount: totaluser})
            }
          })
        });

       {/*For File or media*/}
        let filesArea = []
        const filesRef = ref(getDatabase(), 'files/');
        onChildAdded(filesRef, (data) => {
          data.forEach((item)=>{
            filesArea.push(item.val())
              if(previousProps.groupId){
                if(previousProps.groupId.groupName !== this.props.groupId.groupName){
                    this.setState({files:filesArea})
                }
                }else{
                    this.setState({files:filesArea})
                }
          })
        });
        onChildChanged(filesRef, (data) => {
            filesArea = []
          data.forEach((item)=>{
            filesArea.push(item.val())
           
              if(previousProps.groupId){
                if(previousProps.groupId.groupName !== this.props.groupId.groupName){
                    this.setState({files:filesArea})
                }
            }else{
                this.setState({files:filesArea})
            }
          })
        });

       
    }
  
    componentDidMount(){
        const db = getDatabase();
        onValue(ref(db, 'types/'),(snapshot)=>{
            let arr = []
            snapshot.forEach((item)=>{
                arr.push(item.val())
            })
            this.setState({isTyping: arr})
        }) 
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
        if(e.target.value){
            this.setState({typing: true},()=>{
                const db = getDatabase();
                set(ref(db, 'types/' + this.props.username.uid), {
                typer: this.props.username.uid,
                typing: this.state.typing,
                Groupid: this.props.groupId.id,
                name: this.props.username.displayName
            })
            
        });
        
        }
        else if(e.target.value.length  == ""){
            const db = getDatabase();
            remove(ref(db, 'types/' + this.props.username.uid))
            this.setState({typing: false})
        }   
        else{
            this.setState({typing: false})
            
        }
    }

    handleMessage = ()=>{
        if(this.state.messages){
            const db = getDatabase();
            const messagetListRef = ref(db, 'Message');
            const messagePostRef = push(child( messagetListRef, `${this.props.groupId.id}`));
            set(messagePostRef, {
                Message: this.state.messages,
                Date: Date(),
                Sender: this.props.username.uid,
                Username: this.props.username.displayName,
                Group: this.props.groupId.id
            }).then(()=>{
                this.setState({messages: ''})
            })
        }else{
            console.log("msg nai");
        }
    }
    handleSearchtopic = (e)=>{
        this.setState({searchTopic: e.target.value,searchload: true},()=> this.handleMessegesSearch())
    }
    handleMessegesSearch = ()=>{
        let searchmessages = [...this.state.groupsItem]
        let regex = new RegExp(this.state.searchTopic, 'gi')
        let filterSearch = searchmessages.reduce((initvalue,message)=>{
            if(message.Message && message.Message.match(regex)){
                initvalue.push(message)
            }
            return initvalue
        },[])
        this.setState({filerSearching: filterSearch})
    }
    
    render() {
        return (
            <>
                <Grid style = {{marginTop: 30}}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment style = {{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                  <Header style = {{marginBottom: 0, fontSize: "22px",color: "#444"}}>Groups({this.state.userCount.length > 1 ? `${this.state.userCount.length}  Users` : `${this.state.userCount.length}  User`})
                                  
                                    <div style={{display: "inline-block",fontSize: 13 , marginLeft: 12}}>
                                        {this.state.isTyping.map((type)=>(
                                        type.typer != this.props.username.uid
                                        ?
                                        "Someone Is typing..."
                                        :
                                        ''
                                    
                                    ))}
                                    </div>
                                  </Header>
                                  <Input onChange={this.handleSearchtopic} style = {{width: "50%"}} fluid = "true" icon={{ name: 'search', link: true }} placeholder='Search Messages...'/>
                                <Icon style = {{fontSize: 30, lineHeight: "25px"}} name = "user circle"/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style = {{padding: "0px"}}>
                        <Grid.Column>
                        <Segment style = {{width: "100%",height: "650px", overflowY:"scroll"}}>
                            <Comment>
                            
                               {this.state.searchTopic ? 
                               this.state.filerSearching.map((item)=>(
                                item.Group == this.props.groupId.id 
                                ?
                                <Comment style={this.props.username.uid == item.Sender ? Right : Left}>
                                <Comment.Content style = {{minWidth: "200px"}}>
                                  <Comment.Author as='a'>({item.Username})</Comment.Author>
                                    <span style = {{color: "#666",marginLeft: "5px",display: "inline-block",marginBottom: "8px"}}>{moment(item.Date).fromNow()}</span>
                                     <div style={this.props.username.uid == item.Sender ? Color : Pcolor}>
                                     <Comment.Text>{item.Message}</Comment.Text>
                                     </div>
                                </Comment.Content>
                                 </Comment>
                                 
                                :
                                ""
                             )) : 
                             this.state.groupsItem.map((item)=>(
                                item.Group == this.props.groupId.id 
                                ?
                                <Comment style={this.props.username.uid == item.Sender ? Right : Left}>
                                <Comment.Content style = {{minWidth: "200px"}}>
                                  <Comment.Author as='a'>({item.Username})</Comment.Author>
                                    <span style = {{color: "#666",marginLeft: "5px",display: "inline-block",marginBottom: "8px"}}>{moment(item.Date).fromNow()}</span>
                                     <div style={this.props.username.uid == item.Sender ? Color : Pcolor}>
                                     <Comment.Text>{item.Message}</Comment.Text>
                                     </div>
                                </Comment.Content>
                                 </Comment>
                                 
                                :
                                ""
                             ))
                             }
                               
                               

                                {/*For File or media*/}

                               {this.state.files.map((item)=>(
                                   item.Group == this.props.groupId.id 
                                   ?
                                   <Comment style={this.props.username.uid == item.Sender ? Right : Left}>
                                   <Comment.Content style = {{minWidth: "200px"}}>
                                     <Comment.Author as='a'>({item.Username})</Comment.Author>
                                       <span style = {{color: "#666",marginLeft: "5px",display: "inline-block",marginBottom: "8px"}}>{moment(item.Date).fromNow()}</span>
                                       <Image src={item.fileUrl} size='small' />
                                   </Comment.Content>
                                    </Comment>
                                    
                                   :
                                   ""
                                ))}
                            </Comment>
                        </Segment>
                        </Grid.Column>
                    </Grid.Row>
                       <Grid.Row style = {{padding: "0px"}}>
                           <Grid.Column>
                                <Progress style = {{width: "100%",marginBottom: "0px"}} inverted progress percent = {this.props.fileTransfer} size='small'  success></Progress>
                           </Grid.Column>
                       </Grid.Row>
                    <Grid.Row style = {{padding: "0px"}}>
                        <Grid.Column style = {{width: "100%"}}>
                        <Segment style = {{width: "100%"}}>
                        <Input  type='text' fluid = "true"  value = {this.state.messages} name = "messages" onChange={this.handleChange} style = {{marginBottom: 10}} placeholder='Message'/>
                        <Button onClick={this.handleMessage} style = {{width: "49%",marginRight: "19px"}} primary>Send Message</Button>
                        <Button onClick = {this.open} style = {{width: "49%"}} secondary>Add Media</Button>
                        <Images  users = {this.props.username}  groupid = {this.props.groupId} openModal = {this.state.modal} close = {this.close}/>
                        </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (allprogress)=>({
    fileTransfer: allprogress.progress.progressbar,
})
export default connect(mapStateToProps,{progrecess})(Messages)


let Left = {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
}
let Right = {
   display: "flex",
   justifyContent: "flex-end",
   marginBottom: "20px",

}
let Color = {
    backgroundColor: "#22D3EE",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "50px"
}
let Pcolor = {
    backgroundColor: "#F3F4F6",
    color: "#444",
    padding: "12px 20px",
    borderRadius: "50px"
}

