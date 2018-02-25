const mongoose = require('mongoose')

const { Schema } = mongoose

const locationSchema = new Schema({
    name: String,
    lat: Number,
    long: Number,
    observations: [{
        temperature: Number,
        createdAt: Date,
    }],
})

locationSchema.statics.format = (loc) => {
    const {
        _id: id, name, lat, long, observations,
    } = loc
    const filteredObservations = observations
        .map(obs => ({ temperature: obs.temperature, createdAt: obs.createdAt, id: obs.id }))
    return {
        id,
        name,
        lat,
        long,
        observations: filteredObservations,
    }
}

const Location = mongoose.model('Location', locationSchema)

module.exports = Location
