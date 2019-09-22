import React from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'

const App = () => {
  return (
    <form>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Partner ID'
          className='form-control form-control-lg'
        />
      </div>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
