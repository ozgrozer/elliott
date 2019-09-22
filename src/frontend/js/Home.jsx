import React from 'react'

const Home = () => {
  return (
    <div id='home'>
      <form>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Partner ID'
            className='form-control form-control-lg'
          />
        </div>

        <div className='form-group'>
          <button className='btn btn-primary btn-lg btn-block'>
            Connect
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home
