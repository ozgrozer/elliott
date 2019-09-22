import React from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'

import Home from './Home'

const App = () => {
  return (
    <Home />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
