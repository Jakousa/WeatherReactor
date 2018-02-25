require('babel-register')
require('babel-polyfill')
require('dotenv').config()

const express = require('express')
const routes = require('./server/routes')
const renderServerSide = require('./server/render')
const Bundler = require('parcel-bundler')

const app = express()


app.use('/api', routes)

const waitForBundle = async () => {
    const bundler = new Bundler(
        './client/index.html',
        {
            minify: true, // Parcel gets stuck if not minified
        },
    )
    console.log('start bundling')
    await bundler.bundle()
    console.log('Bundle done')
    if (process.env.NODE_ENV !== 'production') {
        app.use(bundler.middleware())
    } else {
        app.use('/dist', express.static('dist/'))
        app.get('/', renderServerSide(bundler))
    }
}

waitForBundle(app).then(() => {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
