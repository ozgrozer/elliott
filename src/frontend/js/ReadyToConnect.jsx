import React, { useContext } from 'react'

import { MainContext } from './MainContext'

const ReadyToConnect = () => {
  const { state, setState } = useContext(MainContext)

  const next = e => {
    e.preventDefault()
    setState({
      connected: true
    })
  }

  return (
    <div id='readyToConnect'>
      <div id='formWrapper'>
        <form>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Partner IP'
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

      <footer>
        <div className='float-left'>
          Public IP:
          {
            state.publicIp
              ? (
                <button className='btn btn-dark btn-sm'>
                  {`${state.publicIp}:${state.port}`}
                </button>
              )
              : (
                <span>...</span>
              )
          }
        </div>

        <div className='float-right'>
          Local IP:
          <button className='btn btn-dark btn-sm'>
            {state.localIp}:{state.port}
          </button>
        </div>
      </footer>
    </div>
  )
}

export default ReadyToConnect
