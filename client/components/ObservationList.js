import React from 'react'


const sortByDate = (obsA, obsB) => new Date(obsA.createdAt) < new Date(obsB.createdAt)

const groupObservationsByDate = observations => observations.sort(sortByDate).reduce((acc, cur) => {
    const date = new Date(cur.createdAt)
    const found = acc.findIndex(dateObj => dateObj.name === date.toLocaleDateString())
    if (found !== -1) {
        acc[found].temperatureTime
            .push({ time: date.toLocaleTimeString(), temperature: cur.temperature, id: cur.id })
    } else {
        acc.push({
            name: date.toLocaleDateString(),
            temperatureTime: [
                { time: date.toLocaleTimeString(), temperature: cur.temperature, id: cur.id },
            ],
        })
    }
    return acc
}, [])

const ObservationList = ({ observations }) => {
    if (!observations) return null
    const grouped = groupObservationsByDate(observations)
    return (
        <div>
            <h4> Observations: </h4>
            {grouped.map(dateObject => (
                <div key={dateObject.name}>
                    <b>{dateObject.name}</b>
                    {dateObject.temperatureTime.sort(sortByDate).map(obs => (
                        <div key={obs.id}>
                            {obs.time}: {obs.temperature} C°
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ObservationList
