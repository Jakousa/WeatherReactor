import test from 'ava'
import request from 'supertest'
import express from 'express'

import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'

import Location from './models/Location'
import { mockLocations } from '../utils/mockGenerator'
import routes from './routes'

const mockgoose = new Mockgoose(mongoose)
const locations = mockLocations(2)

test.before('Before', async (t) => {
    await mockgoose.prepareStorage()
    mongoose.connect('mongodb://foo/bar')
    await Location.insertMany(locations)
    t.truthy(true)
})

test('get works as intended', async (t) => {
    const app = express()
    app.use('/api', routes)
    const res = await request(app)
        .get('/api/location')
    t.deepEqual(locations, res.body)
})
