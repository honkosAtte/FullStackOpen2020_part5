/* eslint-disable linebreak-style */

import React from 'react'

const Notification = ({ message }) => {
  return (
    <div>
      {
        message === null ?
          <div></div> :
          <div 
          id="error"
          className="error">
            {message}
          </div>
      }
    </div>
  )
}


export default Notification