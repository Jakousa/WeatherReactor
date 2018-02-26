require('babel-register')
require('babel-polyfill')

const express = require('express')
const webpack = require('webpack')
const mongoose = require('mongoose')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const routes = require('./server/routes')
const renderServerSide = require('./server/render')
const config = require('./utils/config')

const template = require('./template')

const url = config.DATABASE_URL
mongoose.connect(url)

const app = express()

app.use('/api', routes)

if (config.NODE_ENV !== 'production') {
    const compiler = webpack(webpackConfig)
    app.use(webpackMiddleware(compiler, {
        publicPath: '/dist',
    }))
    app.use(webpackHotMiddleware(compiler))
    app.get('/', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.send(Buffer.from(template()))
    })
} else {
    app.use('/dist', express.static('dist/'))
    app.get('/', renderServerSide)
}

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        process.exit(0)
    })
})
