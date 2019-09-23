import React, { useContext } from 'react'

import { MainContext } from './MainContext'

const Connected = () => {
  const { state, setState } = useContext(MainContext)

  const disconnect = () => {
    setState({
      connected: false
    })
  }

  const transferStarted = () => {
    setState({
      transferStarted: !state.transferStarted
    })
  }
  const transferStartedClassName = state.transferStarted
    ? 'transferStarted'
    : ''

  return (
    <div id='connected'>
      <header>
        <div className='float-left'>
          <span className='greenCircle' />
          <span>104.131.70.30:2436</span>
        </div>

        <div className='float-right'>
          <button
            onClick={disconnect}
            className='btn btn-danger btn-sm'
          >
            Disconnect
          </button>
        </div>
      </header>

      <div
        id='container'
        className={transferStartedClassName}
      >
        {state.transferStarted ? (
          <div id='transfers'>
            transfers
          </div>
        ) : null}

        <div
          id='fileUploadArea'
          onClick={transferStarted}
        >
          Drop files here...
        </div>
      </div>
    </div>
  )
}

export default Connected
