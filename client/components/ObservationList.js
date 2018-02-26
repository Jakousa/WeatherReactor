import React from 'react'

const sortByDate = (obsA, obsB) => new Date(obsA.createdAt) < new Date(obsB.createdAt)

const ObservationList = ({ observations }) => (!observations ? null : (
    <div className="ui segment">
        <h4> Observations: </h4>
        {observations.sort(sortByDate).map(obs => (
            <div key={obs.id}>
                {new Date(obs.createdAt).toLocaleString()}: {obs.temperature} C°
            </div>
        ))}
    </div>
))

export default ObservationList
