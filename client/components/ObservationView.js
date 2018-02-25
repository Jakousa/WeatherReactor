import React, { Component } from 'react'

export default class ObservationView extends Component {
    state = {
        latestTemp: undefined,
        highestTemp: undefined,
        lowestTemp: undefined,
    }

    componentDidMount() {
        const { observations } = this.props
        this.setTemperatures(observations)
    }

    componentWillReceiveProps(newProps) {
        const { observations } = newProps
        this.setTemperatures(observations)
    }

    setTemperatures = (observations) => {
        if (observations && observations.length > 0) {
            const temperatures = this.filterObservations(observations).map(obs => obs.temperature)
            const lowestTemp = Math.min(...temperatures)
            const highestTemp = Math.max(...temperatures)

            // Latest temp requires us to get the one with highest date value
            const { temperature: latestTemp } = observations.reduce((acc, cur) => (
                new Date(cur.createdAt) > new Date(acc.createdAt) ? cur : acc), { createdAt: 0 })

            this.setState({ lowestTemp, highestTemp, latestTemp })
        }
    }

    filterObservations = observations => observations
        .filter((obs) => {
            // Take observations within 24 hours
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const isWithin24Hours = new Date(obs.createdAt) && new Date(obs.createdAt) > yesterday
            return obs.createdAt && isWithin24Hours
        })

    render() {
        const { latestTemp, highestTemp, lowestTemp } = this.state

        return (
            <div>
                <h4>Latest temperature: {latestTemp}</h4>
                <h4>Highest temperature in 24h: {highestTemp}</h4>
                <h4>Lowest temperature in 24h: {lowestTemp}</h4>
            </div>
        )
    }
}
