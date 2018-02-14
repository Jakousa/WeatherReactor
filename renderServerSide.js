import Router from 'express'
import { renderToString } from 'react-dom/server'
import React from 'react'

import App from './client/components/App'
import template from './template'

const router = Router()

const handleRender = (req, res) => {
    const body = renderToString(<App />)
    const html = template(body, 'reaktor 2018')
    res.send(html)
}


router.get('*', handleRender)

module.exports = router
