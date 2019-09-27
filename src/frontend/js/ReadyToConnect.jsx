import React, { useContext, useEffect } from 'react'
import { Form, Input } from 'rfv'
import axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import io from 'socket.io-client'

import { MainContext } from './MainContext'

const socket = io('http://localhost:' + window.defaults.port)

const validations = {
  partnerIp: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide an IP address'
    }
  ]
}

const ReadyToConnect = () => {
  const { state, setState } = useContext(MainContext)

  useEffect(() => {
    socket.on('event2', (comingData) => {
      console.log('coming data from server to client:', comingData)
    })
    socket.emit('event1', 'sending data from client to server')
  }, [])

  useEffect(() => {
    axios
      .post('/get-public-ip')
      .then(res => {
        setState({
          publicIp: res.data.publicIp
        })
      })
  }, [])

  const postSubmit = (res) => {
    console.log(res.data)
    if (res.data.success) {
      setState({
        connected: true
      })
    } else {
      console.log('error')
    }
  }

  const localIpAndPort = `${state.localIp}:${state.port}`
  const publicIpAndPort = `${state.publicIp}:${state.port}`

  return (
    <div id='readyToConnect'>
      <div id='formWrapper'>
        <Form
          postSubmit={postSubmit}
          postOptions={{ method: 'post', url: '/connect-to-partner' }}
        >
          <div className='form-group'>
            <Input
              type='text'
              name='partnerIp'
              placeholder='Partner IP'
              validations={validations.partnerIp}
              className='form-control form-control-lg'
            />
          </div>

          <button className='btn btn-primary btn-lg btn-block'>
            Connect
          </button>
        </Form>
      </div>

      <footer>
        <div className='float-left'>
          Public IP:
          {
            state.publicIp
              ? (
                <CopyToClipboard text={publicIpAndPort}>
                  <button className='btn btn-dark btn-sm'>
                    {publicIpAndPort}
                  </button>
                </CopyToClipboard>
              )
              : (
                <span>...</span>
              )
          }
        </div>

        <div className='float-right'>
          Local IP:
          <CopyToClipboard text={localIpAndPort}>
            <button className='btn btn-dark btn-sm'>
              {localIpAndPort}
            </button>
          </CopyToClipboard>
        </div>
      </footer>
    </div>
  )
}

export default ReadyToConnect
