const router = require('express').Router()
const mongoose = require('mongoose')

const url = process.env.DATABASE_URL

mongoose.connect(url)

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

router.get('/location', (req, res) => {
    res.status(200).json(locations).end()
})

router.post('/observation/:id', (req, res) => {
    const receivedObservation = Object.assign({}, req.body)
    const locationId = Number(req.params.id)
    console.log(locationId)
    const foundLocation = locations.find(location => location.id === locationId)
    if (!foundLocation) {
        res.status(404).end()
    } else {
        foundLocation.observations.push(receivedObservation)
        res.status(200).json(foundLocation).end()
    }
})

module.exports = router
