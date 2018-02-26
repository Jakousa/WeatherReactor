import { renderToString } from 'react-dom/server'
import React from 'react'

import App from '../client/components/App'
import template from '../template'
import Location from './models/Location'

const renderServerSide = async (req, res) => {
    const title = 'reaktor 2018'
    const locations = await Location.find()
    const body = renderToString(<App locations={locations.map(Location.format)} />)
    const html = template(title, body)
    res.send(html)
}

module.exports = renderServerSide
