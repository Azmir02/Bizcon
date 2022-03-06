import React, { Component } from 'react'
import { Grid, Segment,Icon } from 'semantic-ui-react'

export default class Colorpanel extends Component {
    render() {
        return (
            <>
                <Segment style = {{backgroundColor: "#111827",borderRadius: 0,paddingTop: 20,height: "100vh"}}>
                    <Grid>
                       <Segment style = {{background: "transparent", width: "100%", borderBottom: "1px solid #989FAB",borderRadius: 0}}>
                       <Icon name = "add circle" style = {{color: "#fff",textAlign: "center", fontSize: 25, marginLeft: 20}}/>
                       </Segment>
                        <Grid.Column width={3}></Grid.Column>
                    </Grid>
                </Segment>
            </>
        )
    }
}
