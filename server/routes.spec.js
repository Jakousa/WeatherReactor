import test from 'ava'
import request from 'supertest'
import express from 'express'

import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'

import Location from './models/Location'
import { mockLocations, mockObservations } from '../utils/mockGenerator'
import routes from './routes'

const mockgoose = new Mockgoose(mongoose)

const removeIdsFromLocation = (location) => {
    const {
        name,
        lat,
        long,
        observations,
    } = location
    const formattedObservations = observations
        .map(obs => ({ createdAt: obs.createdAt, temperature: obs.temperature }))
    return {
        name,
        lat,
        long,
        observations: formattedObservations,
    }
}

const makeApp = () => {
    const app = express()
    app.use('/api', routes)
    return app
}

test.before('Before', async () => {
    await mockgoose.prepareStorage()
    mongoose.connect('mongodb://location/tests')
})

const get = async (app, t) => {
    const res = await request(app)
        .get('/api/location')
    t.is(res.status, 200)
    return res.body
}

test('get works, format is correct and no data is missing', async (t) => {
    const locations = mockLocations(2)
    await Location.insertMany(locations)
    const app = makeApp()
    const responseLocations = await get(app, t)
    responseLocations.forEach((loc) => {
        t.truthy(loc.id, `Location ${JSON.stringify(loc)} didn't have an id`)
        loc.observations.forEach(obs =>
            t.truthy(obs.id, `Observation ${JSON.stringify(obs)} for location ${JSON.stringify(loc)} didn't have an id`))
    })
    const formattedLocations = responseLocations.map(loc => removeIdsFromLocation(loc))
    const filteredLocations = formattedLocations
        .filter(loc => locations
            .find(l => l.name === loc.name && l.lat === loc.lat && l.long === loc.long))
    t.deepEqual(locations, filteredLocations, 'Locations did not equal filtered locations')
})

test('creating a new observation returns the updated location', async (t) => {
    const location = mockLocations(1)[0]
    await Location.create(location)
    const app = makeApp()
    const responseLocations = await get(app, t)
    const responseLocation = responseLocations.find(loc =>
        location.name === loc.name && location.lat === loc.lat && location.long === loc.long)
    const observation = mockObservations(1)[0]
    const res = await request(app)
        .post(`/api/observation/${responseLocation.id}`)
        .send(observation)
    t.is(res.status, 200)
    t.is(res.body.observations.length, responseLocation.observations.length + 1, 'Length was not correct')
    t.truthy(
        res.body.observations.find(obs =>
            obs.temperature === observation.temperature),
        `Did not find ${JSON.stringify(observation)} in response location`,
    )
})

// Checking for side-effects needs to be serial since other tests would look like side-effects
test.serial('creating a new observation fails without side effects if it is too hot, cold or not a number', async (t) => {
    const location = mockLocations(1)[0]
    await Location.create(location)
    const app = makeApp()
    const responseLocationsBefore = await get(app, t)
    const responseLocation = responseLocationsBefore.find(loc =>
        location.name === loc.name && location.lat === loc.lat && location.long === loc.long)
    const invalidObservations = [
        { temperature: 100 },
        {},
        { temperature: -300 },
        { temperature: 'merkkijono' },
    ]
    const responses = await Promise.all(invalidObservations.map(obs => request(app)
        .post(`/api/observation/${responseLocation.id}`)
        .send(obs)))

    responses.forEach(res => t.is(res.status, 400))

    const responseLocationsAfter = await get(app, t)

    t.deepEqual(responseLocationsBefore, responseLocationsAfter)
})
