import { renderToString } from 'react-dom/server'
import React from 'react'

import App from '../client/components/App'
import template from '../template'
import Location from './models/Location'

const findJSFileFromBundle = (bundler) => {
    if (bundler.bundleHashes) {
        const keys = bundler.bundleHashes.keys()
        return Array.from(keys).filter(key => key.includes('js'))[0].split(/\\|\//).filter(part => part.includes('js'))[0]
    }
    return null
}

const renderServerSide = bundler => async (req, res) => {
    const title = 'reaktor 2018'
    const locations = await Location.find()
    const body = renderToString(<App locations={locations.map(Location.format)} />)
    const jsfile = findJSFileFromBundle(bundler)
    const html = template(title, body, jsfile)
    res.send(html)
}

module.exports = renderServerSide
