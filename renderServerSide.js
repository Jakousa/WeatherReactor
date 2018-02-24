import { renderToString } from 'react-dom/server'
import React from 'react'

import App from './client/components/App'
import template from './template'

const findJSFileFromBundle = (bundler) => {
    const keys = bundler.bundleHashes.keys()
    return Array.from(keys).filter(key => key.includes('js'))[0].split('/').filter(part => part.includes('js'))[0]
}

const renderServerSide = bundler => (req, res) => {
    const title = 'reaktor 2018'
    const body = renderToString(<App />)
    const jsfile = findJSFileFromBundle(bundler)
    const html = template(title, body, jsfile)
    res.send(html)
}

module.exports = renderServerSide
