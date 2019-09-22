import React, { useContext } from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'

import { MainProvider, MainContext } from './MainContext'
import Connected from './Connected'
import ReadyToConnect from './ReadyToConnect'

const App = () => {
  const { state } = useContext(MainContext)

  return state.connected
    ? <Connected />
    : <ReadyToConnect />
}

const Main = () => {
  return (
    <MainProvider>
      <App />
    </MainProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
