import React, { Component } from 'react'
import { Grid, Segment} from 'semantic-ui-react'
export default class Metapanel extends Component {
    render() {
        return (
            <div>
                 <Segment style = {{backgroundColor: "#1F2937",borderRadius: 0,paddingTop: 20,height: "100vh"}}>
                    <Grid>
                       <Segment style = {{background: "transparent", width: "100%", borderBottom: "1px solid #989FAB",borderRadius: 0}}></Segment>
                        <Grid.Column width={3}></Grid.Column>
                    </Grid>
                </Segment>
            </div>
        )
    }
}
