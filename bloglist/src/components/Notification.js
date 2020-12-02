import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(' Hello from notification', notification)
  return (
    <div>
      {
        notification.message === null ?
          <div></div> :
          <div 
          id="error"
          className="error">
            {notification.message}
          </div>
      }
    </div>
  )
}


export default Notification