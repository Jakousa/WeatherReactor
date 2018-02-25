import React, { Component } from 'react'
import axios from 'axios'

import LocationView from './LocationView'

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
        newLocations.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())
        this.setState({ locations: newLocations })
    }

    render() {
        const { locations } = this.state
        return (
            <div className="ui styled accordion">
                {locations
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())
                    .map(location => (
                        <LocationView
                            key={location.id}
                            location={location}
                            sendObservation={this.sendObservation}
                        />
                    ))}
            </div>
        )
    }
}
