import React, { useContext } from 'react'

import { MainContext } from './MainContext'

const ReadyToConnect = () => {
  const { setState } = useContext(MainContext)

  const next = e => {
    e.preventDefault()
    setState({
      connected: true
    })
  }

  return (
    <div id='readyToConnect'>
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

export default ReadyToConnect
