import Bundler from 'parcel-bundler'

const bundler = new Bundler('./client/index.html')

module.exports = (app) => {
    app.use(bundler.middleware())
}
