require('babel-register')
require('babel-polyfill')
require('dotenv').config()

const express = require('express')
const routes = require('./server/routes')
const renderServerSide = require('./server/render')
const Bundler = require('parcel-bundler')
const mongoose = require('mongoose')

const url = process.env.DATABASE_URL

mongoose.connect(url)

const app = express()

app.use('/api', routes)

const waitForBundle = async () => {
    const bundler = new Bundler(
        './client/index.html',
        {
            minify: true, // Parcel gets stuck if not minified
        },
    )

    if (process.env.NODE_ENV !== 'production') {
        console.log('start bundling')
        await bundler.bundle()
        console.log('Bundle done')
        app.use(bundler.middleware())
    } else {
        bundler.bundle()
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

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        process.exit(0)
    })
})
