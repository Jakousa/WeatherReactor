import React, { Component } from 'react'
import { Input, Button, Icon, Segment, Rail } from 'semantic-ui-react'

import ObservationView from './ObservationView'
import ObservationList from './ObservationList'

export default class LocationControl extends Component {
    state = {
        newTemperature: '',
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

    renderList = () => {
        if (this.state.displayList) {
            return (
                <Rail position="right">
                    <ObservationList observations={this.props.location.observations} />
                </Rail>
            )
        }
        return null
    }

    render() {
        const { location } = this.props
        return (
            <Segment>
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
                <Button animated color="green" onClick={this.toggleObservationList}>
                    <Button.Content visible>Open observation list</Button.Content>
                    <Button.Content hidden>
                        <Icon name="right arrow" />
                    </Button.Content>
                </Button>
                {this.renderList()}

            </Segment>
        )
    }
}
