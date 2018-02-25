const router = require('express').Router()
const mongoose = require('mongoose')

const { Schema } = mongoose
const url = process.env.DATABASE_URL

mongoose.connect(url)

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

/**
 * Return all locations
 */
router.get('/location', async (req, res) => {
    const locations = await Location.find()
    res.status(200).json(locations.map(Location.format)).end()
})

// Simple validations
const ABSOLUTE_ZERO = -237.15
const REALLY_HOT = 50
const validTemperature = n => Number(n) > ABSOLUTE_ZERO && Number(n) < REALLY_HOT
const isNumeric = n => !Number.isNaN(Number(n)) && Number.isFinite(Number(n))

/**
 * Create new observation and return the updated location
 */
router.post('/observation/:id', async (req, res) => {
    const observation = Object.assign({ createdAt: new Date() }, req.body)
    if (!isNumeric(observation.temperature) || !validTemperature(observation.temperature)) {
        return res.status(400).end()
    }
    const locationId = req.params.id
    const location = await Location.findByIdAndUpdate(
        locationId,
        { $push: { observations: observation } },
        { new: true },
    )
    return res.status(200).json(Location.format(location)).end()
})

module.exports = router


/*
const locations = [
    {
        id: 1,
        name: 'Tokio',
        lat: '35.6584421',
        long: '139.7328635',
        observations: [],
    },
    {
        id: 2,
        name: 'Helsinki',
        lat: '60.1697530',
        long: '24.9490830',
        observations: [],
    },
    {
        id: 3,
        name: 'New York',
        lat: '40.7406905',
        long: '-73.9938438',
        observations: [],
    },
    {
        id: 4,
        name: 'Amsterdam',
        lat: '52.3650691',
        long: '4.9040238',
        observations: [],
    },
    {
        id: 5,
        name: 'Dubai',
        lat: '25.092535',
        long: '55.1562243',
        observations: [],
    },
]
*/
