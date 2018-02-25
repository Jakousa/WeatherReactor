import 'babel-polyfill'

import React from 'react'
import { render, hydrate } from 'react-dom'
import App from './components/App'

if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'production') {
        hydrate(
            <App />,
            document.getElementById('app'),
        )
    } else {
        render(
            <App />,
            document.getElementById('app'),
        )
    }
}
