import React, { Component } from 'react'

import LocationControl from './LocationControl'

export default class ObservationLocation extends Component {
    state = {
        active: false,
    }

    toggleActive = () => this.setState({ active: !this.state.active })

    render() {
        const { location } = this.props
        const { active } = this.state
        const contentActive = `content ${active ? 'active' : ''}`
        return (
            <div>
                <div className="title" onClick={this.toggleActive} role="presentation">
                    {location.name}
                </div>
                <div className={contentActive}>
                    <LocationControl
                        location={location}
                        sendObservation={this.props.sendObservation}
                    />
                </div>
            </div>
        )
    }
}
