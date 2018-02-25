import React, { Component } from 'react'
import axios from 'axios'

import LocationList from './LocationList'

export default class App extends Component {
    state = {
        locations: this.props.locations ? this.props.locations : [],
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

    render() {
        return (
            <div>
                <LocationList
                    locations={this.state.locations}
                    sendObservation={this.sendObservation}
                />
            </div >
        )
    }
}
