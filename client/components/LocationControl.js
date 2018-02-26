import React, { Component } from 'react'
import { Input, Button, Icon, Segment, Sidebar, Menu } from 'semantic-ui-react'

import ObservationView from './ObservationView'
import ObservationList from './ObservationList'

export default class LocationControl extends Component {
    state = {
        newTemperature: '',
        displayList: false,
    }

    handleChange = (event) => {
        this.setState({ newTemperature: event.target.value })
    }

    handleObservation = () => {
        const { newTemperature: temperature } = this.state
        const { location } = this.props
        const observation = {
            temperature,
        }
        this.props.sendObservation(location, observation)
    }

    toggleObservationList = () => {
        this.setState({ displayList: !this.state.displayList })
    }

    render() {
        const { location } = this.props
        const { displayList } = this.state
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation="overlay"
                        width="wide"
                        direction="right"
                        visible={displayList}
                        icon="labeled"
                        vertical
                        inverted
                    >
                        <ObservationList observations={this.props.location.observations} />
                    </Sidebar>
                    <Sidebar.Pusher style={{ margin: '2%' }}>
                        <h3>{location.name}: {location.lat}, {location.long} </h3>
                        <ObservationView observations={location.observations} />
                        <br />
                        <Input
                            onChange={this.handleChange}
                            label={{ basic: true, content: 'C°' }}
                            labelPosition="right"
                            action={{
                                color: 'blue',
                                labelPosition: 'left',
                                icon: 'thermometer',
                                content: 'Add observation',
                                onClick: this.handleObservation,
                            }}
                            actionPosition="left"
                        />
                        <br />

                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <Button animated color="green" onClick={this.toggleObservationList}>
                    <Button.Content visible>Open observation list</Button.Content>
                    <Button.Content hidden>
                        <Icon name="right arrow" />
                    </Button.Content>
                </Button>
            </div>
        )
    }
}
