require('dotenv').config()

module.exports.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports.DATABASE_URL = process.env.DATABASE_URL

module.exports.PORT = process.env.PORT || 3000
