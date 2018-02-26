import 'babel-polyfill'

import React from 'react'
import { render, hydrate } from 'react-dom'
import App from './components/App'

const refresh = () => {
    hydrate(
        <App />,
        document.getElementById('app'),
    )
}

if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'development') {
        render(
            <App />,
            document.getElementById('app'),
        )
    } else {
        refresh()
    }
}

if (module.hot) {
    module.hot.accept('./components/App', () => refresh())
}
