import React, { Component } from 'react'

export default class LocationControl extends Component {
    state = {
        newTemperature: '',
        latestTemp: undefined,
        highestTemp: undefined,
        lowestTemp: undefined,
    }

    componentDidMount() {
        const { observations } = this.props.location
        this.setTemperatures(observations)
    }

    componentWillReceiveProps(newProps) {
        const { observations } = newProps.location
        this.setTemperatures(observations)
    }

    setTemperatures = (observations) => {
        if (observations && observations.length > 0) {
            const copyObservations = [...observations]
            copyObservations.sort((a, b) => a.temperature < b.temperature)
            const { temperature: lowestTemp } = copyObservations[copyObservations.length - 1]
            const { temperature: highestTemp } = copyObservations[0]
            const { temperature: latestTemp } = observations[observations.length - 1]
            this.setState({ lowestTemp, highestTemp, latestTemp })
        }
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

    render() {
        const { location } = this.props
        const { latestTemp, highestTemp, lowestTemp } = this.state
        return (
            <div>
                <h3>{location.name}: {location.lat}, {location.long} </h3>
                <h4>Latest temperature: {latestTemp}</h4>
                <h4>Highest temperature in 24h: {highestTemp}</h4>
                <h4>Lowest temperature in 24h: {lowestTemp}</h4>
                <div className="ui left action input">
                    <button className="ui blue labeled icon button" onClick={this.handleObservation}>
                        <i className="plus icon" />
                        Add
                    </button>
                    <input onChange={this.handleChange} type="text" />
                </div>
            </div>
        )
    }
}
