import React, { useContext, useEffect } from 'react'
import { Form, Input } from 'rfv'
import axios from 'axios'

import { MainContext } from './MainContext'

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

  return (
    <div id='readyToConnect'>
      <div id='formWrapper'>
        <Form
          postSubmit={postSubmit}
          postOptions={{ method: 'post', url: '/connect-to-ip' }}
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
