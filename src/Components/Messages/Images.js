import React, { Component } from 'react'
import { getDownloadURL,ref,uploadBytesResumable } from 'firebase/storage';
import { storage,getDatabase, push, set,child,ref as reffer} from "../Firebaseconfig";
import { Button,Header, Icon, Modal,Input} from 'semantic-ui-react'
import { connect } from 'react-redux';
import {progrecess} from '../action'

class Images extends Component {
    state = {
        file: '',
        progress: ''
    }

    handleChange = (e)=>{
        this.setState({file: e.target.files[0]});
    }

    uploadMedia = ()=>{
        if(this.state.file){
            let storageReference = ref(storage,`files/${this.state.file.name}`)
            let uploadTask = uploadBytesResumable(storageReference, this.state.file)
            uploadTask.on('state_changed',(snapshot)=>{
                let progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({progress: progress})
                this.props.progrecess(this.state.progress)
            },(err)=>{
                console.log(err);
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                    console.log(url);
                    const filetListRef = reffer(getDatabase(), 'files');
                    const fileRef = push(child( filetListRef, `${this.props.groupid.id}`));
                    set(fileRef, {
                        fileUrl: url,
                        Date: Date(),
                        Sender: this.props.users.uid,
                        Username: this.props.users.displayName,
                        Group: this.props.groupid.id
                    }).then(()=>{
                        this.props.close()
                        this.setState({progress: ""})
                    })
                })
            })
        }
        else{
            console.log("Aisho na");
        }
    }
    render() {
        return (
            <>
                <Modal style = {{width: 400}}
                    basic
                    onClose={true}
                    onOpen={true}
                    open={this.props.openModal}
                    size='small'
                    >
                    <Header icon>
                        <Icon name='film' />
                        Add Media
                    </Header>
                    <Modal.Content>
                    <Input onChange={this.handleChange} type='file' icon="upload"/>
                    </Modal.Content>
                    <Modal.Actions style = {{textAlign: "center"}}>
                        <Button color='green' inverted onClick = {this.uploadMedia}>
                        <Icon name='checkmark' /> Upload
                        </Button>

                        <Button onClick = {this.props.close} basic color='red' inverted>
                        <Icon name='remove' /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

export default connect(null,{progrecess})(Images)