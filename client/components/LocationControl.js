import React, { Component } from 'react'
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
                <div className="ui right rail">
                    <ObservationList observations={this.props.location.observations} />
                </div>
            )
        }
        return null
    }

    render() {
        const { location } = this.props
        return (
            <div className="ui segment">
                <h3>{location.name}: {location.lat}, {location.long} </h3>
                <ObservationView observations={location.observations} />
                <br />
                <div className="ui grid">
                    <div className="ui left action input">
                        <button className="ui blue labeled icon button" onClick={this.handleObservation}>
                            <i className="plus icon" />
                            Add observation
                        </button>
                        <input onChange={this.handleChange} type="text" />
                    </div>
                    <button className="ui green button" onClick={this.toggleObservationList}>
                        Open list
                    </button>
                </div>
                {this.renderList()}

            </div>
        )
    }
}
