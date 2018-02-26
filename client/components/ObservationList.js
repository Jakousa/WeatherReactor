import React from 'react'

const ObservationList = ({ observations }) => (!observations ? null : (
    <div className="ui segment">
        <h4> Observations: </h4>
        {observations.map(obs => (
            <div key={obs.id}>
                {new Date(obs.createdAt).toLocaleString()}: {obs.temperature} C°
            </div>
        ))}
    </div>
))

export default ObservationList
