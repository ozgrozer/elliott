import React, { useContext } from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'

import { MainProvider, MainContext } from './MainContext'

const App = () => {
  const { setState } = useContext(MainContext)

  const next = e => {
    e.preventDefault()
    setState({
      connected: true
    })
  }

  return (
    <div id='app'>
      <form>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Partner ID'
            className='form-control form-control-lg'
          />
        </div>

        <button
          onClick={next}
          className='btn btn-primary btn-lg btn-block'
        >
          Connect
        </button>
      </form>
    </div>
  )
}

const Main = () => {
  return (
    <MainProvider>
      <App />
    </MainProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
