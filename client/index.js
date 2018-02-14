import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

if (typeof window !== 'undefined') {
    render(
        <App />,
        document.getElementById('app'),
    )
}
