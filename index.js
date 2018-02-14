require('babel-register')
require('babel-polyfill')

const express = require('express')
const routes = require('./server/routes')
const devBundler = require('./devBundler')
const renderServerSide = require('./renderServerSide')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use('/api', routes)

if (process.env.NODE_ENV !== 'production') {
    devBundler(app)
} else {
    app.use('/dist', express.static('dist/'))
    app.get('/', renderServerSide)
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
