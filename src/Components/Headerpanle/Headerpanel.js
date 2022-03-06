import React, { Component } from 'react'
import { Grid, Segment,Header,Input} from 'semantic-ui-react'
import Userpanel from '../Sidepanel/Userpanel'

export default class Headerpanel extends Component {
    render() {
        return (
            <>
                <Grid style = {{position: "relative", zIndex: 9999}}>
                    <Grid.Row style = {{paddingBottom: 0}}>
                        <Grid.Column width={16}>
                            <Segment style = {{padding: "10px 20px", borderRadius: 0}}>
                                <Grid columns= "equal">
                                <Grid.Column width={4}>
                                <Header as = "h1" textAlign = "left" style = {{color: "#1F2937",margin: "0px 0px"}}>
                                    Bizcon
                                </Header>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                <Input fluid = "true" icon={{ name: 'search', link: true }} placeholder='Search Groups...'/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Userpanel user = {this.props.user}></Userpanel>
                                </Grid.Column>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        )
    }
}