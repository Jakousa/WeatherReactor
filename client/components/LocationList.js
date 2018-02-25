import React, { Component } from 'react'
import axios from 'axios'
import { Tab } from 'semantic-ui-react'

import LocationControl from './LocationControl'

export default class LocationList extends Component {
    state = {
        locations: [],
    }

    componentDidMount() {
        this.getLocations()
    }

    getLocations = async () => {
        const url = '/api/location'
        const { data: locations } = await axios.get(url)
        this.setState({ locations })
    }

    sendObservation = async (location, observation) => {
        const url = `/api/observation/${location.id}`
        const { data: responseLocation } = await axios.post(url, observation)
        const newLocations =
            [...this.state.locations.filter(l => l.id !== responseLocation.id), responseLocation]
        this.setState({ locations: newLocations })
    }

    createPanesFromLocations = locations => locations
        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())
        .map(loc => ({
            menuItem: loc.name,
            render: () => (
                <Tab.Pane attached={false}>
                    <LocationControl
                        key={loc.id}
                        location={loc}
                        sendObservation={this.sendObservation}
                    />
                </Tab.Pane>),
        }))

    render() {
        const { locations } = this.state
        const panes = this.createPanesFromLocations(locations)
        return (
            <div className="ui styled accordion">
                <Tab menu={{ pointing: true }} panes={panes} />
            </div>
        )
    }
}
