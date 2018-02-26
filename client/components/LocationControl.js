import React, { Component } from 'react'
import { Input, Button, Icon, Segment, Sidebar, Menu } from 'semantic-ui-react'
import { isNumeric, validTemperature } from '../../utils/validations'

import ObservationView from './ObservationView'
import ObservationList from './ObservationList'

export default class LocationControl extends Component {
    state = {
        newTemperature: '',
        displayList: false,
        error: false,
    }

    isValid = value => isNumeric(value) && validTemperature(value)

    handleChange = (event) => {
        const { value } = event.target
        this.setState({ newTemperature: value, error: !this.isValid(value) })
    }

    handleObservation = () => {
        const { newTemperature: temperature } = this.state
        const { location } = this.props
        const observation = {
            temperature,
        }
        if (this.isValid(temperature)) {
            this.props.sendObservation(location, observation)
        }
        this.setState({ error: !this.isValid(temperature) })
    }

    toggleObservationList = () => {
        this.setState({ displayList: !this.state.displayList })
    }

    render() {
        const { location } = this.props
        const { displayList, error } = this.state
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
                            error={error}
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
