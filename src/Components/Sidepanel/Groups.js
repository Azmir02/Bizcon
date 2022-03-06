import React, { Component } from 'react'
import { Button, Form, Header, Icon, Modal,Message,Menu } from 'semantic-ui-react'
import { getDatabase, ref, push, set,onValue} from "../Firebaseconfig";
import { connect } from 'react-redux';
import { currentgroups } from '../action';
class Groups extends Component {
    state = {
        groups: [],
        modal: false,
        groupName: '',
        groupTitle: '',
        errMsg: '',
        firstLoad: true,
        active: ''
    }
    open = ()=>{
        this.setState({modal: true})
    }
    close = ()=>{
        this.setState({modal: false})
    }


    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    Formvalid = ({groupName,groupTitle})=>{
        if(groupName && groupTitle){
            return true
        }
        else{
            this.setState({errMsg: "Please Give Group name Or Title"})
        }
    }


    componentDidMount(){
        const db = getDatabase();
            const starCountRef = ref(db, 'Groups');
            onValue(starCountRef, (snapshot) => {
            let groupsCount = []
            snapshot.forEach(item=>{
                let groupAll = {
                    id: item.key,
                    createdBy: item.val().createdby,
                    groupName: item.val().groupName,
                    groupTitle: item.val().groupTitle

                }
                groupsCount.push(groupAll)
            })
            this.setState({groups: groupsCount},this.firstGroupafterload)
        })
        
    }

    
    handleCreate = (e)=>{
        e.preventDefault()
        if(this.Formvalid(this.state)){
                const db = getDatabase();
                const grouptListRef = ref(db, 'Groups');
                const groupPostRef = push(grouptListRef);
                set(groupPostRef, {
                    groupName: this.state.groupName,
                    groupTitle: this.state.groupTitle,
                    createdBy: this.props.groupuser
                 }).then(()=>{
                    this.setState({modal: false})
                 })
        }
        
    }

    firstGroupafterload = ()=>{
        let firstGroup = this.state.groups[0]
        if(this.state.firstLoad && this.state.groups.length > 0){
            this.props.currentgroups(firstGroup)
            this.setState({active: firstGroup.id})
        }
        this.setState({firstLoad: false})
    }

    groupDetails = (groups)=>{
        this.props.currentgroups(groups)
        this.setState({active: groups.id})
    }
    render() {
        const {groupename,grouptitle,errMsg} = this.state
        return (
            <>
                <Header as = "h4" textAlign = "center" style = {{color: "#989FAB"}}><Icon name = "group" style = {{display: "inline-block",marginRight: 10}}/>Groups({this.state.groups.length})<Icon onClick = {this.open} name = "plus square" style = {{display: "inline-block", marginLeft: 50}}/></Header>
                <Menu text vertical style = {{marginLeft: 10}}>
                    <Menu.Item style = {{fontSize: "16px",color: "#989FAB"}} >Groups Name</Menu.Item>
                    {this.state.groups.map((mainGroup)=>(
                            <Menu.Item onClick = {()=>{this.groupDetails(mainGroup)}} style = {mainGroup.id == this.state.active ? afterActive : beforeActive}>{mainGroup.groupName}</Menu.Item>
                    ))}
                </Menu>
                <Modal style = {{width: 400}}
                    basic
                    onClose={true}
                    onOpen={true}
                    open={this.state.modal}
                    size='small'
                    >
                    <Header icon>
                        <Icon name='group' />
                        Create New Group
                    </Header>
                    <Modal.Content>
                    <Form onSubmit = {this.handleCreate}>
                        <Form.Field className = {errMsg ? "error": ""}>
                        <label style = {{color: "#fff"}}>Group Name</label>
                        <input name = "groupName" placeholder='Group Name' onChange = {this.handleChange} value = {groupename} />
                        </Form.Field>
                        <Form.Field className = {errMsg ? "error": ""}>
                        <label style = {{color: "#fff"}}>Group Title</label>
                        <input name = "groupTitle" placeholder='Group Title' onChange = {this.handleChange} value = {grouptitle} />
                        </Form.Field>
                     </Form>
                     {errMsg ? <Message style = {{backgroundColor: "#D01919", color: "#fff",textAlign: "center"}}>{errMsg}</Message> : ''}
                    </Modal.Content>
                    <Modal.Actions style = {{textAlign: "center"}}>
                        <Button color='green' inverted onClick = {this.handleCreate}>
                        <Icon name='checkmark' /> Create
                        </Button>

                        <Button onClick = {this.close} basic color='red' inverted>
                        <Icon name='remove' /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

let beforeActive = {
    color: "#989FAB",
    fontSize: "13px"
}
let afterActive = {
    color: "#fff",
    fontSize: "14px",
    backgroundColor: "#111827",
    fontWeight: "700",
    padding: "10px",
    boxSizing: "border-box",
    width:" 215px"
}

export default connect(null,{currentgroups})(Groups)