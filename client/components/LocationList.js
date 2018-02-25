import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'

import LocationControl from './LocationControl'

export default class LocationList extends Component {
    createPanesFromLocations = locations => locations
        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())
        .map(loc => ({
            menuItem: loc.name,
            render: () => (
                <Tab.Pane attached={false}>
                    <LocationControl
                        key={loc.id}
                        location={loc}
                        sendObservation={this.props.sendObservation}
                    />
                </Tab.Pane>),
        }))

    render() {
        const { locations } = this.props
        const panes = this.createPanesFromLocations(locations)
        return (
            <div className="ui styled accordion">
                <Tab menu={{ pointing: true }} panes={panes} />
            </div>
        )
    }
}
